import { useEffect, useState } from 'react';
import { plans as localPlans, recipes as localRecipes } from './data/site';

// Client for the Express + MongoDB API in backend/.
// The URL comes from VITE_API_URL (build time, see .env.production) or ?api=<url> for testing.
// Without a URL, or when the API does not answer within 8 s, the pages use the bundled
// data in src/data/site.js and the forms run in demo mode.
const TIMEOUT_MS = 8000;

const readApiUrl = () => {
  let fromQuery = null;
  try {
    fromQuery = new URLSearchParams(window.location.search).get('api');
  } catch {
    // no window
  }
  return (fromQuery || import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
};

export const API_URL = readApiUrl();

export async function apiRequest(path, body) {
  if (!API_URL) throw Object.assign(new Error('offline'), { offline: true });
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(API_URL + path, {
      method: body ? 'POST' : 'GET',
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal: ctrl.signal,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw Object.assign(new Error(data.details?.[0]?.message || data.error || `HTTP ${res.status}`), { status: res.status });
    return data;
  } catch (err) {
    if (!err.status) err.offline = true; // network error or timeout
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

// One shared request per page load for plans + recipes.
let catalogPromise;
const loadCatalog = () => {
  if (!catalogPromise) {
    catalogPromise = Promise.all([apiRequest('/api/plans'), apiRequest('/api/recipes')])
      .then(([plans, recipes]) => (plans.length && Array.isArray(recipes) ? { plans, recipes, online: true } : null))
      .catch(() => null);
  }
  return catalogPromise;
};

/** Plans and recipes from the API, or the bundled copy while loading / offline. */
export function useCatalog() {
  const [catalog, setCatalog] = useState({ plans: localPlans, recipes: localRecipes, online: false });
  useEffect(() => {
    let alive = true;
    loadCatalog().then((live) => alive && live && setCatalog(live));
    return () => {
      alive = false;
    };
  }, []);
  return catalog;
}
