// Fills plans and recipes from src/data/site.js (the same file the frontend bundles as its offline copy).
// Usage: npm run seed            -> inserts only into empty collections
//        npm run seed -- --reset -> replaces plans and recipes (subscriptions and gift cards are kept)
const path = require("path");
const { pathToFileURL } = require("url");
const mongoose = require("mongoose");
const config = require("./lib/config");
const { connect } = require("./lib/db");
const { Plan, Recipe } = require("./models");

const SITE = path.join(__dirname, "..", "..", "src", "data", "site.js");
const slugify = (s) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

async function seed({ reset = false } = {}) {
  if (reset) await Promise.all([Plan.deleteMany({}), Recipe.deleteMany({})]);
  const { plans, recipes, PRICE_PER_SERVING } = await import(pathToFileURL(SITE).href);
  const out = {};
  if (await Plan.estimatedDocumentCount()) out.plans = "skipped (not empty)";
  else {
    await Plan.insertMany(plans.map(({ id, ...p }, i) => ({ ...p, slug: id, pricePerServing: PRICE_PER_SERVING, order: i })));
    out.plans = plans.length;
  }
  if (await Recipe.estimatedDocumentCount()) out.recipes = "skipped (not empty)";
  else {
    await Recipe.insertMany(recipes.map(({ id, ...r }, i) => ({ ...r, slug: slugify(r.title), order: i })));
    out.recipes = recipes.length;
  }
  return out;
}

if (require.main === module) {
  connect(config.mongoUri)
    .then(() => seed({ reset: process.argv.includes("--reset") }))
    .then((out) => console.log("Seed done:", out))
    .catch((err) => {
      console.error("Seed failed:", err.message);
      process.exitCode = 1;
    })
    .finally(() => mongoose.disconnect());
}

module.exports = { seed };
