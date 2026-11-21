// Data layer for the admin page (#/admin).
// - "api" mode talks to the Express API with a Bearer token (real admin, or the read-only
//   demo admin whose writes the server answers with 403).
// - "sandbox" mode is used when the API is not configured or does not answer: it starts from
//   the bundled data (src/data/site.js) and keeps every change in sessionStorage only, so
//   nothing real is ever changed and a new tab starts fresh.
import { plans as localPlans, recipes as localRecipes, PRICE_PER_SERVING } from '../../../data/site';
import { API_URL } from '../../../api';
import { readDemoCards } from '../../ui/hooks';

export const DEMO_LOGIN = { email: 'demo@hellofresh-clone.az', password: 'demo1234' };
export const STATUSES = ['pending', 'active', 'paused', 'cancelled'];

const TIMEOUT_MS = 8000;
const SESSION_KEY = 'hf-clone-admin-session';
const SANDBOX_KEY = 'hf-clone-admin-sandbox';

// sessionStorage with an in-memory fallback (storage can be blocked, e.g. in some iframes).
const memory = {};
const storage = {
  get(key) {
    try {
      const saved = sessionStorage.getItem(key);
      if (saved !== null) return JSON.parse(saved);
    } catch {
      // blocked or broken: use the in-memory copy
    }
    return memory[key] ?? null;
  },
  set(key, value) {
    memory[key] = value;
    try {
      if (value === null) sessionStorage.removeItem(key);
      else sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage blocked: the session lasts until the page reloads
    }
  },
};

export const loadSession = () => storage.get(SESSION_KEY);
export const saveSession = (session) => storage.set(SESSION_KEY, session);

async function call(path, { method = 'GET', body, token } = {}) {
  if (!API_URL) throw Object.assign(new Error('offline'), { offline: true });
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const headers = {};
    if (body) headers['Content-Type'] = 'application/json';
    if (token) headers.Authorization = `Bearer ${token}`;
    const res = await fetch(API_URL + path, { method, headers, body: body ? JSON.stringify(body) : undefined, signal: ctrl.signal });
    const data = res.status === 204 ? {} : await res.json().catch(() => ({}));
    if (!res.ok) throw Object.assign(new Error(data.details?.[0]?.message || data.error || `HTTP ${res.status}`), { status: res.status });
    return data;
  } catch (err) {
    if (!err.status) err.offline = true; // network error or timeout
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

/** Logs in through the API. Resolves { mode: 'api', token, role }; offline errors carry err.offline. */
export async function apiLogin(email, password) {
  const { token, role } = await call('/api/auth/login', { method: 'POST', body: { email, password } });
  return { mode: 'api', token, role: role || 'admin' };
}

/* ---------- sandbox (in-browser copy) ---------- */

const slugify = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const day = (d) => new Date(Date.UTC(2026, 10, d, 10)).toISOString();

function freshSandbox() {
  const plans = localPlans.map(({ id, ...p }, i) => ({ ...p, id, slug: id, pricePerServing: PRICE_PER_SERVING, active: true, order: i }));
  const recipes = localRecipes.map((r, i) => ({ ...r, id: slugify(r.title), slug: slugify(r.title), active: true, order: i }));
  const people = [
    ['Aysel Mammadova', 'meat-veggies', 2, 3, 'active'],
    ['Murad Aliyev', 'veggie', 4, 4, 'pending'],
    ['Leyla Hasanova', 'family', 4, 5, 'paused'],
    ['Kamran Guliyev', 'fit', 2, 2, 'cancelled'],
  ];
  const subscriptions = people.map(([name, plan, ppl, meals, status], i) => {
    const weeklyTotal = Math.round(ppl * meals * PRICE_PER_SERVING * 100) / 100;
    return {
      reference: `HF-DEMO0${i + 1}`,
      plan,
      planTitle: plans.find((p) => p.slug === plan).title,
      people: ppl,
      meals,
      servings: ppl * meals,
      weeklyTotal,
      giftApplied: 0,
      firstBoxTotal: weeklyTotal,
      name,
      email: `${name.split(' ')[0].toLowerCase()}@example.com`,
      status,
      createdAt: day(12 - i),
    };
  });
  const giftCards = [
    { code: 'GIFT-DEMO0001', amount: 50, balance: 50, to: 'Nigar', from: 'Aysel', demo: true, createdAt: day(10) },
    { code: 'GIFT-DEMO0002', amount: 25, balance: 0, to: 'Murad', from: 'Leyla', demo: true, createdAt: day(8) },
  ];
  return { plans, recipes, subscriptions, giftCards };
}

const readSandbox = () => storage.get(SANDBOX_KEY) || freshSandbox();
function writeSandbox(fn) {
  const data = readSandbox();
  const out = fn(data);
  storage.set(SANDBOX_KEY, data);
  return out;
}
export const resetSandbox = () => storage.set(SANDBOX_KEY, null);

const httpError = (status, message) => Object.assign(new Error(message), { status });

function sandboxCrud(key) {
  return {
    list: async () => [...readSandbox()[key]].sort((a, b) => a.order - b.order),
    save: async (item, originalSlug) =>
      writeSandbox((data) => {
        const list = data[key];
        const i = list.findIndex((x) => x.slug === (originalSlug || item.slug));
        if (!originalSlug && i !== -1) throw httpError(409, 'Already exists');
        if (originalSlug && i === -1) throw httpError(404, 'Not found');
        // Like the API's PUT, an update may send only some fields (e.g. { active }).
        const row = { active: true, order: list.length, ...(i === -1 ? {} : list[i]), ...item };
        if (!/^[a-z0-9-]+$/.test(row.slug || '')) throw httpError(400, 'Slug: lowercase letters, digits and dashes');
        if (!String(row.title || '').trim()) throw httpError(400, 'Enter a title');
        if (key === 'recipes' && !data.plans.some((p) => p.slug === row.plan)) throw httpError(400, 'Unknown plan');
        row.id = row.slug;
        if (i === -1) list.push(row);
        else list[i] = row;
        return row;
      }),
    remove: async (slug) =>
      writeSandbox((data) => {
        data[key] = data[key].filter((x) => x.slug !== slug);
      }),
  };
}

const sandboxStore = {
  mode: 'sandbox',
  plans: sandboxCrud('plans'),
  recipes: sandboxCrud('recipes'),
  listSubscriptions: async (status) => readSandbox().subscriptions.filter((s) => !status || s.status === status),
  setSubscriptionStatus: async (reference, status) =>
    writeSandbox((data) => {
      const sub = data.subscriptions.find((s) => s.reference === reference);
      if (!sub) throw httpError(404, 'Subscription not found');
      sub.status = status;
      return sub;
    }),
  // Gift cards made on the Gift Cards page while offline (same tab) are listed too.
  listGiftCards: async () => {
    const made = Object.entries(readDemoCards()).map(([code, amount]) => ({ code, amount, balance: amount, to: '—', from: '—', demo: true, createdAt: new Date().toISOString() }));
    return [...made, ...readSandbox().giftCards];
  },
};

/** Same methods as the sandbox, backed by the API. */
function apiStore(token) {
  const auth = (path, opts = {}) => call(path, { ...opts, token });
  const crud = (path) => ({
    list: () => auth(`/api/admin/${path}`),
    save: (item, originalSlug) =>
      originalSlug
        ? auth(`/api/admin/${path}/${encodeURIComponent(originalSlug)}`, { method: 'PUT', body: item })
        : auth(`/api/admin/${path}`, { method: 'POST', body: item }),
    remove: (slug) => auth(`/api/admin/${path}/${encodeURIComponent(slug)}`, { method: 'DELETE' }),
  });
  return {
    mode: 'api',
    plans: crud('plans'),
    recipes: crud('recipes'),
    listSubscriptions: (status) => auth(`/api/admin/subscriptions${status ? `?status=${encodeURIComponent(status)}` : ''}`),
    setSubscriptionStatus: (reference, status) => auth(`/api/admin/subscriptions/${encodeURIComponent(reference)}`, { method: 'PATCH', body: { status } }),
    listGiftCards: () => auth('/api/admin/gift-cards'),
  };
}

export const storeFor = (session) => (session.mode === 'api' ? apiStore(session.token) : sandboxStore);
