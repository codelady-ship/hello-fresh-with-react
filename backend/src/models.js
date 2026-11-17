const mongoose = require("mongoose");
const { jsonOpts } = require("./lib/base");

const PEOPLE = [2, 4];
const MEALS = [2, 3, 4, 5];
const GIFT_AMOUNTS = [25, 50, 75, 100];
const slug = { type: String, required: true, unique: true, trim: true, lowercase: true, match: /^[a-z0-9-]+$/ };
const opts = { timestamps: true, toJSON: jsonOpts };

const planSchema = new mongoose.Schema(
  {
    slug,
    title: { type: String, required: true, trim: true, maxlength: 60 },
    tagline: { type: String, trim: true, maxlength: 80, default: "" },
    text: { type: String, trim: true, maxlength: 300, default: "" },
    image: { type: String, required: true },
    alt: { type: String, default: "" },
    pricePerServing: { type: Number, required: true, min: 1, max: 50 },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  opts
);

const recipeSchema = new mongoose.Schema(
  {
    slug,
    title: { type: String, required: true, trim: true, maxlength: 100 },
    plan: { type: String, required: true, index: true }, // plan slug
    time: { type: Number, required: true, min: 5, max: 240 }, // minutes
    tags: [{ type: String, trim: true, maxlength: 30 }],
    image: { type: String, required: true },
    alt: { type: String, default: "" },
    position: { type: String, default: "" }, // CSS object-position for the photo
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  opts
);

const giftCardSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    amount: { type: Number, enum: GIFT_AMOUNTS, required: true },
    balance: { type: Number, required: true, min: 0 },
    to: { type: String, required: true, trim: true, maxlength: 40 },
    from: { type: String, required: true, trim: true, maxlength: 40 },
    message: { type: String, trim: true, maxlength: 140, default: "" },
    demo: { type: Boolean, default: true }, // no payment in this practice project
  },
  opts
);

const subscriptionSchema = new mongoose.Schema(
  {
    reference: { type: String, required: true, unique: true },
    plan: { type: String, required: true },
    planTitle: { type: String, required: true },
    people: { type: Number, enum: PEOPLE, required: true },
    meals: { type: Number, enum: MEALS, required: true },
    servings: { type: Number, required: true },
    pricePerServing: { type: Number, required: true },
    weeklyTotal: { type: Number, required: true },
    giftCode: { type: String, default: "" },
    giftApplied: { type: Number, default: 0 },
    firstBoxTotal: { type: Number, required: true },
    name: { type: String, required: true, trim: true, maxlength: 60 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120, index: true },
    status: { type: String, enum: ["pending", "active", "paused", "cancelled"], default: "pending", index: true },
  },
  opts
);

module.exports = {
  PEOPLE,
  MEALS,
  GIFT_AMOUNTS,
  Plan: mongoose.model("Plan", planSchema),
  Recipe: mongoose.model("Recipe", recipeSchema),
  GiftCard: mongoose.model("GiftCard", giftCardSchema),
  Subscription: mongoose.model("Subscription", subscriptionSchema),
};
