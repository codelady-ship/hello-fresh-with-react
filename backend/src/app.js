const crypto = require("crypto");
const express = require("express");
const { z } = require("zod");
const { createBaseApp, publicWriteLimiter } = require("./lib/base");
const { requireAdmin } = require("./lib/auth");
const { HttpError, validate, notFound, errorHandler } = require("./lib/errors");
const { PEOPLE, MEALS, GIFT_AMOUNTS, Plan, Recipe, GiftCard, Subscription } = require("./models");

const round2 = (n) => Math.round(n * 100) / 100;
const code = (prefix, bytes = 3) => `${prefix}-${crypto.randomBytes(bytes).toString("hex").toUpperCase()}`;
const slug = z.string().trim().toLowerCase().regex(/^[a-z0-9-]+$/, "Use lowercase letters, digits and dashes").max(60);
const fail = (field, message) => new HttpError(400, "Validation failed", [{ field, message }]);

const planSchema = z.object({
  slug,
  title: z.string().trim().min(2).max(60),
  tagline: z.string().trim().max(80).optional(),
  text: z.string().trim().max(300).optional(),
  image: z.string().trim().min(1).max(200),
  alt: z.string().trim().max(160).optional(),
  pricePerServing: z.coerce.number().min(1).max(50),
  active: z.boolean().optional(),
  order: z.coerce.number().int().optional(),
});

const recipeSchema = z.object({
  slug,
  title: z.string().trim().min(3).max(100),
  plan: slug,
  time: z.coerce.number().int().min(5).max(240),
  tags: z.array(z.string().trim().min(1).max(30)).max(6).optional(),
  image: z.string().trim().min(1).max(200),
  alt: z.string().trim().max(160).optional(),
  position: z.string().trim().max(30).optional(),
  active: z.boolean().optional(),
  order: z.coerce.number().int().optional(),
});

const giftSchema = z.object({
  amount: z.coerce.number().refine((n) => GIFT_AMOUNTS.includes(n), `Amount must be one of ${GIFT_AMOUNTS.join(", ")}`),
  to: z.string().trim().min(1, "Enter the recipient's name").max(40),
  from: z.string().trim().min(1, "Enter your name").max(40),
  message: z.string().trim().max(140).optional().default(""),
});

const subscriptionSchema = z.object({
  plan: slug,
  people: z.coerce.number().refine((n) => PEOPLE.includes(n), "People must be 2 or 4"),
  meals: z.coerce.number().refine((n) => MEALS.includes(n), "Meals must be 2 to 5"),
  name: z.string().trim().min(2, "Enter your name").max(60),
  email: z.string().trim().email("Enter a valid email").max(120),
  giftCode: z.string().trim().toUpperCase().max(20).optional().default(""),
});

const statusSchema = z.object({ status: z.enum(["pending", "active", "paused", "cancelled"]) });

// Plans and recipes are addressed by slug; `id` in the answer is the slug so the frontend
// can use the same keys as its bundled data.
const withSlugId = (doc) => ({ ...doc.toJSON(), id: doc.slug });

function crud(api, path, Model, schema, extraCheck) {
  api.get(`/admin/${path}`, requireAdmin, async (_req, res) => res.json((await Model.find().sort({ order: 1 })).map(withSlugId)));
  api.post(`/admin/${path}`, requireAdmin, validate(schema), async (req, res) => {
    if (extraCheck) await extraCheck(req.body);
    res.status(201).json(withSlugId(await Model.create(req.body)));
  });
  api.put(`/admin/${path}/:slug`, requireAdmin, validate(schema.partial()), async (req, res) => {
    if (extraCheck) await extraCheck(req.body);
    const doc = await Model.findOneAndUpdate({ slug: String(req.params.slug) }, req.body, { new: true, runValidators: true });
    if (!doc) throw new HttpError(404, "Not found");
    res.json(withSlugId(doc));
  });
  api.delete(`/admin/${path}/:slug`, requireAdmin, async (req, res) => {
    const doc = await Model.findOneAndDelete({ slug: String(req.params.slug) });
    if (!doc) throw new HttpError(404, "Not found");
    res.status(204).end();
  });
}

function createApp() {
  const app = createBaseApp();
  const api = express.Router();

  /* ----- Public catalogue ----- */
  api.get("/plans", async (_req, res) => {
    res.json((await Plan.find({ active: true }).sort({ order: 1 })).map(withSlugId));
  });

  api.get("/recipes", async (req, res) => {
    const filter = { active: true };
    if (req.query.plan && req.query.plan !== "all") filter.plan = String(req.query.plan);
    if (req.query.maxTime) filter.time = { $lte: Number(req.query.maxTime) || 240 };
    if (req.query.tag) filter.tags = String(req.query.tag);
    res.json((await Recipe.find(filter).sort({ order: 1 })).map(withSlugId));
  });

  api.get("/recipes/:slug", async (req, res) => {
    const doc = await Recipe.findOne({ slug: String(req.params.slug), active: true });
    if (!doc) throw new HttpError(404, "Recipe not found");
    res.json(withSlugId(doc));
  });

  /* ----- Gift cards ----- */
  api.post("/gift-cards", publicWriteLimiter(), validate(giftSchema), async (req, res) => {
    const card = await GiftCard.create({ ...req.body, balance: req.body.amount, code: code("GIFT", 4) });
    res.status(201).json({ code: card.code, amount: card.amount, to: card.to, from: card.from });
  });

  api.get("/gift-cards/:code", async (req, res) => {
    const card = await GiftCard.findOne({ code: String(req.params.code).toUpperCase() });
    if (!card) throw new HttpError(404, "Gift card not found");
    res.json({ code: card.code, amount: card.amount, balance: card.balance });
  });

  /* ----- Plan subscriptions (price is always calculated here) ----- */
  api.post("/subscriptions", publicWriteLimiter(), validate(subscriptionSchema), async (req, res) => {
    const s = req.body;
    const plan = await Plan.findOne({ slug: s.plan, active: true });
    if (!plan) throw fail("plan", "Unknown plan");
    const servings = s.people * s.meals;
    const weeklyTotal = round2(servings * plan.pricePerServing);

    let giftApplied = 0;
    if (s.giftCode) {
      // atomic: take what the card still has, up to the first box total
      const card = await GiftCard.findOne({ code: s.giftCode });
      if (!card || card.balance <= 0) throw fail("giftCode", "Gift card not found or already used");
      giftApplied = round2(Math.min(card.balance, weeklyTotal));
      const updated = await GiftCard.findOneAndUpdate({ _id: card._id, balance: { $gte: giftApplied } }, { $inc: { balance: -giftApplied } }, { new: true });
      if (!updated) throw fail("giftCode", "Gift card balance changed, please try again");
    }

    const sub = await Subscription.create({
      reference: code("HF"),
      plan: plan.slug,
      planTitle: plan.title,
      people: s.people,
      meals: s.meals,
      servings,
      pricePerServing: plan.pricePerServing,
      weeklyTotal,
      giftCode: s.giftCode,
      giftApplied,
      firstBoxTotal: round2(weeklyTotal - giftApplied),
      name: s.name,
      email: s.email,
    });
    res.status(201).json({
      reference: sub.reference,
      planTitle: sub.planTitle,
      people: sub.people,
      meals: sub.meals,
      servings,
      pricePerServing: sub.pricePerServing,
      weeklyTotal,
      giftApplied,
      firstBoxTotal: sub.firstBoxTotal,
      status: sub.status,
    });
  });

  /* ----- Admin (JWT) ----- */
  crud(api, "plans", Plan, planSchema);
  crud(api, "recipes", Recipe, recipeSchema, async (body) => {
    if (body.plan && !(await Plan.exists({ slug: body.plan }))) throw fail("plan", "Unknown plan");
  });

  api.get("/admin/subscriptions", requireAdmin, async (req, res) => {
    const filter = req.query.status ? { status: String(req.query.status) } : {};
    res.json(await Subscription.find(filter).sort({ createdAt: -1 }).limit(200));
  });

  api.patch("/admin/subscriptions/:reference", requireAdmin, validate(statusSchema), async (req, res) => {
    const sub = await Subscription.findOneAndUpdate({ reference: String(req.params.reference).toUpperCase() }, { status: req.body.status }, { new: true });
    if (!sub) throw new HttpError(404, "Subscription not found");
    res.json(sub);
  });

  api.get("/admin/gift-cards", requireAdmin, async (_req, res) => {
    res.json(await GiftCard.find().sort({ createdAt: -1 }).limit(200));
  });

  app.use("/api", api);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}

module.exports = { createApp };
