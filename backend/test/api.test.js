// API tests on an in-memory MongoDB. Run: npm test
const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");

process.env.JWT_SECRET = "test-secret";
process.env.ADMIN_EMAIL = "admin@test.local";
process.env.ADMIN_PASSWORD = "test-password";
process.env.PUBLIC_RATE_LIMIT = "200";
process.env.LOOKUP_RATE_LIMIT = "6";

const mongoose = require("mongoose");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server-core");
const { createApp } = require("../src/app");
const { seed } = require("../src/seed");
const { ensureIndexes } = require("../src/lib/db");

let mongo;
let app;
let giftCode;
let reference;

before(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri("hf-test"));
  await ensureIndexes();
  await seed();
  app = createApp();
});

after(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

test("catalogue: plans and recipes keyed by slug", async () => {
  const plans = (await request(app).get("/api/plans")).body;
  assert.deepEqual(plans.map((p) => p.id), ["meat-veggies", "veggie", "family", "fit"]);
  assert.equal(plans[0].pricePerServing, 7.49);
  assert.equal((await request(app).get("/api/recipes")).body.length, 6);
  const family = (await request(app).get("/api/recipes?plan=family")).body;
  assert.ok(family.length === 2 && family.every((r) => r.plan === "family"));
  const quick = (await request(app).get("/api/recipes?maxTime=25")).body;
  assert.ok(quick.every((r) => r.time <= 25));
  const one = await request(app).get(`/api/recipes/${family[0].id}`);
  assert.equal(one.body.title, family[0].title);
  assert.equal((await request(app).get("/api/recipes/nope")).status, 404);
});

test("gift card: create and check balance", async () => {
  const res = await request(app).post("/api/gift-cards").send({ amount: 25, to: "Nigar", from: "Aysel", message: "Bon appétit!" });
  assert.equal(res.status, 201);
  assert.match(res.body.code, /^GIFT-[0-9A-F]{8}$/);
  giftCode = res.body.code;
  assert.equal(res.body.demo, true);
  assert.equal((await request(app).get(`/api/gift-cards/${giftCode.toLowerCase()}`)).body.balance, 25);
  const bad = await request(app).post("/api/gift-cards").send({ amount: 30, to: "", from: "A" });
  assert.equal(bad.status, 400);
  assert.deepEqual(bad.body.details.map((d) => d.field).sort(), ["amount", "to"]);
});

test("subscription: server price and gift card redemption", async () => {
  const res = await request(app)
    .post("/api/subscriptions")
    .send({ plan: "veggie", people: 2, meals: 3, name: "Test User", email: "Test@Example.com", giftCode: giftCode.toLowerCase(), weeklyTotal: 1 });
  assert.equal(res.status, 201, JSON.stringify(res.body));
  assert.match(res.body.reference, /^HF-[0-9A-F]{6}$/);
  assert.equal(res.body.servings, 6);
  assert.equal(res.body.weeklyTotal, 44.94);
  assert.equal(res.body.giftApplied, 25);
  assert.equal(res.body.firstBoxTotal, 19.94);
  reference = res.body.reference;
  assert.equal((await request(app).get(`/api/gift-cards/${giftCode}`)).body.balance, 0);

  const used = await request(app).post("/api/subscriptions").send({ plan: "veggie", people: 2, meals: 3, name: "Test User", email: "t@example.com", giftCode });
  assert.equal(used.status, 400);
  assert.equal(used.body.details[0].field, "giftCode");
});

test("subscription: parallel redemptions of one card -> one discount, no orphan subscription", async () => {
  const card = (await request(app).post("/api/gift-cards").send({ amount: 50, to: "Leyla", from: "Murad" })).body;
  const body = (i) => ({ plan: "veggie", people: 2, meals: 4, name: "Paralel " + i, email: `p${i}@example.com`, giftCode: card.code });
  const results = await Promise.all(Array.from({ length: 6 }, (_, i) => request(app).post("/api/subscriptions").send(body(i))));
  const ok = results.filter((r) => r.status === 201);
  // 2 x 4 x 7.49 = 59.92 > 50, so the whole card goes to exactly one subscription
  assert.equal(ok.length, 1, results.map((r) => r.status).join(","));
  assert.equal(ok[0].body.giftApplied, 50);
  assert.ok(results.filter((r) => r.status !== 201).every((r) => r.status === 400 && r.body.details[0].field === "giftCode"));
  const login = await request(app).post("/api/auth/login").send({ email: "admin@test.local", password: "test-password" });
  const subs = (await request(app).get("/api/admin/subscriptions").set("Authorization", `Bearer ${login.body.token}`)).body;
  assert.equal(subs.filter((x) => x.name.startsWith("Paralel")).length, 1); // losers were rolled back
  assert.equal((await request(app).get(`/api/gift-cards/${card.code}`)).body.balance, 0);
});

test("gift card lookup is rate limited", async () => {
  let last;
  for (let i = 0; i < 8; i++) last = await request(app).get("/api/gift-cards/GIFT-00000000");
  assert.equal(last.status, 429);
});

test("subscription: validation", async () => {
  const bad = await request(app).post("/api/subscriptions").send({ plan: "veggie", people: 3, meals: 7, name: "", email: "nope" });
  assert.equal(bad.status, 400);
  assert.deepEqual(bad.body.details.map((d) => d.field).sort(), ["email", "meals", "name", "people"]);
  const unknown = await request(app).post("/api/subscriptions").send({ plan: "keto", people: 2, meals: 2, name: "Test", email: "t@example.com" });
  assert.equal(unknown.body.details[0].field, "plan");
});

test("admin: auth, subscriptions and catalogue CRUD", async () => {
  assert.equal((await request(app).get("/api/admin/subscriptions")).status, 401);
  const login = await request(app).post("/api/auth/login").send({ email: "admin@test.local", password: "test-password" });
  const auth = { Authorization: `Bearer ${login.body.token}` };

  const subs = (await request(app).get("/api/admin/subscriptions").set(auth)).body;
  assert.equal(subs.length, 2); // the gift-card test above + the parallel-redemption winner
  assert.equal(subs.find((x) => x.reference === reference).email, "test@example.com");
  assert.equal((await request(app).patch(`/api/admin/subscriptions/${reference}`).set(auth).send({ status: "active" })).body.status, "active");

  const recipe = { slug: "lentil-soup", title: "Red Lentil Soup", plan: "veggie", time: 30, tags: ["Vegan"], image: "images/page4-1.jpg" };
  assert.equal((await request(app).post("/api/admin/recipes").set(auth).send(recipe)).status, 201);
  assert.equal((await request(app).post("/api/admin/recipes").set(auth).send({ ...recipe, slug: "x", plan: "keto" })).status, 400);
  assert.equal((await request(app).put("/api/admin/recipes/lentil-soup").set(auth).send({ time: 25 })).body.time, 25);
  assert.equal((await request(app).get("/api/recipes?tag=Vegan")).body.length, 1);
  assert.equal((await request(app).delete("/api/admin/recipes/lentil-soup").set(auth)).status, 204);

  assert.equal((await request(app).put("/api/admin/plans/fit").set(auth).send({ pricePerServing: 8.49 })).body.pricePerServing, 8.49);
  assert.equal((await request(app).get("/api/admin/gift-cards").set(auth)).body.length, 2);
});

test("demo admin: seeded, can read, every write is blocked with 403", async () => {
  const bad = await request(app).post("/api/auth/login").send({ email: "demo@hellofresh-clone.az", password: "wrong" });
  assert.equal(bad.status, 401);
  const login = await request(app).post("/api/auth/login").send({ email: "demo@hellofresh-clone.az", password: "demo1234" });
  assert.equal(login.status, 200);
  assert.equal(login.body.role, "demo");
  const auth = { Authorization: `Bearer ${login.body.token}` };
  for (const path of ["plans", "recipes", "subscriptions", "gift-cards"]) {
    assert.equal((await request(app).get(`/api/admin/${path}`).set(auth)).status, 200, path);
  }
  const writes = [
    request(app).post("/api/admin/plans").set(auth).send({ slug: "keto", title: "Keto", image: "x.jpg", pricePerServing: 9 }),
    request(app).put("/api/admin/plans/fit").set(auth).send({ pricePerServing: 1 }),
    request(app).delete("/api/admin/recipes/crunchy-carrot-lettuce-wraps").set(auth),
    request(app).patch("/api/admin/subscriptions/HF-000000").set(auth).send({ status: "cancelled" }),
  ];
  for (const res of await Promise.all(writes)) {
    assert.equal(res.status, 403);
    assert.match(res.body.error, /read-only/);
  }
  const plans = (await request(app).get("/api/plans")).body;
  assert.notEqual(plans.find((p) => p.id === "fit").pricePerServing, 1);
  const real = await request(app).post("/api/auth/login").send({ email: "admin@test.local", password: "test-password" });
  assert.equal(real.body.role, "admin");
});

test("demo admin: no usable gift-card code and no real name / email in any admin GET", async () => {
  // Real visitors, through the public routes.
  const gift = { amount: 100, to: "Gulnara Huseynova", from: "Tofiq Bayramli", message: "Private note for Gulnara" };
  const card = (await request(app).post("/api/gift-cards").send(gift)).body;
  assert.match(card.code, /^GIFT-[0-9A-F]{8}$/);
  const spent = (await request(app).post("/api/gift-cards").send({ amount: 75, to: "Sevda Quliyeva", from: "Anar Quliyev" })).body;
  const customer = { name: "Real Customer", email: "real.customer@privatemail.test" };
  // 2 x 2 x 7.49 = 29.96, so the 75 card keeps a balance: its code is still worth money.
  const sub = await request(app).post("/api/subscriptions").send({ plan: "veggie", people: 2, meals: 2, ...customer, giftCode: spent.code });
  assert.equal(sub.status, 201, JSON.stringify(sub.body));

  const demoLogin = await request(app).post("/api/auth/login").send({ email: "demo@hellofresh-clone.az", password: "demo1234" });
  const demo = { Authorization: `Bearer ${demoLogin.body.token}` };
  const adminLogin = await request(app).post("/api/auth/login").send({ email: "admin@test.local", password: "test-password" });
  const admin = { Authorization: `Bearer ${adminLogin.body.token}` };

  const realCards = (await request(app).get("/api/admin/gift-cards").set(admin)).body;
  const realSubs = (await request(app).get("/api/admin/subscriptions").set(admin)).body;
  // The real admin still gets everything as stored.
  assert.ok(realCards.some((c) => c.code === card.code && c.to === gift.to && c.from === gift.from && c.message === gift.message && c.balance === 100));
  assert.ok(realSubs.some((s) => s.name === customer.name && s.email === customer.email && s.giftCode === spent.code));

  // Every code, name, email and message stored so far, by every test in this file.
  const secrets = new Set();
  for (const c of realCards) [c.code, c.code.slice(5), c.to, c.from, c.message].forEach((v) => v && secrets.add(v));
  for (const s of realSubs) [s.name, s.email, s.giftCode].forEach((v) => v && secrets.add(v));
  for (const v of ["real.customer", "Gulnara", "Huseynova", "Tofiq", "Bayramli", "Private note", "privatemail", "Sevda", "Quliyev"]) secrets.add(v);
  assert.ok(secrets.size >= 20);

  const seen = {};
  for (const path of ["plans", "recipes", "subscriptions", "subscriptions?status=pending", "gift-cards"]) {
    const res = await request(app).get(`/api/admin/${path}`).set(demo);
    assert.equal(res.status, 200, path);
    seen[path] = res.body;
    const text = JSON.stringify(res.body).toLowerCase();
    for (const s of secrets) assert.ok(!text.includes(String(s).toLowerCase()), `/api/admin/${path} leaks "${s}" to the demo admin`);
    assert.doesNotMatch(JSON.stringify(res.body), /GIFT-[0-9A-F]{3,}/i, `/api/admin/${path} shows gift-code characters in a row`);
  }

  const shown = seen["gift-cards"].find((c) => c.id === realCards.find((r) => r.code === card.code).id);
  assert.deepEqual(
    { code: shown.code, to: shown.to, from: shown.from, message: shown.message, amount: shown.amount, balance: shown.balance, masked: shown.masked },
    { code: `GIFT-••••••${card.code.slice(-2)}`, to: "G*** H***", from: "T*** B***", message: "(hidden in demo)", amount: 100, balance: 100, masked: true }
  );
  const shownSub = seen.subscriptions.find((s) => s.reference === sub.body.reference);
  assert.equal(shownSub.name, "R*** C***");
  assert.equal(shownSub.email, "r***@p***.test");
  assert.equal(shownSub.giftCode, `GIFT-••••••${spent.code.slice(-2)}`);
  assert.ok(seen.subscriptions.every((s) => s.masked === true) && seen["gift-cards"].every((c) => c.masked === true));

  // Nothing the demo admin was given can be redeemed or looked up.
  const candidates = new Set();
  const collect = (v) => {
    if (typeof v === "string") candidates.add(v);
    else if (v && typeof v === "object") Object.values(v).forEach(collect);
  };
  collect(seen["gift-cards"]);
  collect(seen.subscriptions);
  const body = (giftCode) => ({ plan: "veggie", people: 2, meals: 2, name: "Demo Visitor", email: "demo.visitor@example.com", giftCode });
  for (const value of candidates) {
    if (!value.trim() || value.length > 20) continue; // empty = no gift code; over 20 = longer than the schema accepts
    const res = await request(app).post("/api/subscriptions").send(body(value));
    assert.equal(res.status, 400, `"${value}" from the demo admin was accepted as a gift code`);
    assert.equal(res.body.details[0].field, "giftCode");
  }
  const after = (await request(app).get("/api/admin/gift-cards").set(admin)).body;
  assert.deepEqual(after.map((c) => [c.code, c.balance]), realCards.map((c) => [c.code, c.balance]));
  assert.equal((await request(app).get("/api/admin/subscriptions").set(admin)).body.length, realSubs.length);
  // The same request with the real code works, so the refusals above were about the masked value.
  const ok = await request(app).post("/api/subscriptions").send(body(card.code));
  assert.equal(ok.status, 201);
  assert.equal(ok.body.giftApplied, 29.96);
});

test("mask helpers and role check", async () => {
  const { maskName, maskEmail, maskGiftCode } = require("../src/lib/mask");
  assert.equal(maskName("  real   customer "), "R*** C***");
  assert.equal(maskName(""), "***");
  assert.equal(maskEmail("Real.Customer@Gmail.test"), "r***@g***.test");
  assert.equal(maskEmail("nonsense"), "***");
  assert.equal(maskGiftCode("GIFT-1A2B3C4D"), "GIFT-••••••4D");
  assert.equal(maskGiftCode(""), "");
  // A token signed with another algorithm is refused.
  const jwt = require("jsonwebtoken");
  const hs512 = jwt.sign({ sub: "x", role: "admin" }, process.env.JWT_SECRET, { algorithm: "HS512" });
  assert.equal((await request(app).get("/api/admin/gift-cards").set("Authorization", `Bearer ${hs512}`)).status, 401);
});
