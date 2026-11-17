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
