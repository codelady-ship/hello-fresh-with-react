// What the public demo admin (role "demo") may see of customers' data.
// Its password is published on purpose, so its answers must never contain a gift-card code that
// can be redeemed (a code is all POST /api/subscriptions needs) or a customer's real name / email.
// Every shape is rebuilt from an allow-list: a field added to a model later stays hidden until it
// is listed here.

const plain = (doc) => (doc && typeof doc.toJSON === "function" ? doc.toJSON() : doc) || {};

/** "Real Customer" -> "R*** C***" */
function maskName(v) {
  const words = String(v || "").trim().split(/\s+/).filter(Boolean);
  return words.map((w) => `${[...w][0].toUpperCase()}***`).join(" ") || "***";
}

/** "real.customer@gmail.test" -> "r***@g***.test" (a private domain can be a surname, so it is masked too) */
function maskEmail(v) {
  const s = String(v || "").trim().toLowerCase();
  const at = s.lastIndexOf("@");
  if (at < 1) return "***";
  const domain = s.slice(at + 1);
  const dot = domain.lastIndexOf(".");
  return `${s[0]}***@${domain[0] || ""}***${dot > 0 ? domain.slice(dot) : ""}`;
}

/** "GIFT-1A2B3C4D" -> "GIFT-••••••4D". Only the last two characters stay, enough to tell rows
    apart; the six hidden ones leave 16.7 million candidates behind a rate-limited lookup. */
function maskGiftCode(v) {
  const s = String(v || "");
  if (!s) return "";
  return `GIFT-••••••${s.length >= 8 ? s.slice(-2) : ""}`;
}

const HIDDEN = "(hidden in demo)";

function maskGiftCard(doc) {
  const c = plain(doc);
  return {
    id: c.id,
    code: maskGiftCode(c.code),
    amount: c.amount,
    balance: c.balance,
    to: maskName(c.to),
    from: maskName(c.from),
    message: c.message ? HIDDEN : "",
    demo: c.demo,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
    masked: true,
  };
}

function maskSubscription(doc) {
  const s = plain(doc);
  return {
    id: s.id,
    reference: s.reference,
    plan: s.plan,
    planTitle: s.planTitle,
    people: s.people,
    meals: s.meals,
    servings: s.servings,
    pricePerServing: s.pricePerServing,
    weeklyTotal: s.weeklyTotal,
    giftCode: maskGiftCode(s.giftCode),
    giftApplied: s.giftApplied,
    firstBoxTotal: s.firstBoxTotal,
    name: maskName(s.name),
    email: maskEmail(s.email),
    status: s.status,
    createdAt: s.createdAt,
    updatedAt: s.updatedAt,
    masked: true,
  };
}

module.exports = { maskName, maskEmail, maskGiftCode, maskGiftCard, maskSubscription, HIDDEN };
