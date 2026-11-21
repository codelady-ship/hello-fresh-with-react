import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { asset } from '../../../data/site';
import { usePageTitle, useToast } from '../../ui/hooks';
import { DEMO_LOGIN, STATUSES, apiLogin, loadSession, resetSandbox, saveSession, storeFor } from './store';

const input = 'min-h-11 w-full rounded border border-gray-300 bg-white px-3 py-2 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200';
const btnSolid = 'inline-flex min-h-11 items-center justify-center rounded bg-green-600 px-5 py-2 font-semibold text-white transition hover:bg-green-700 disabled:opacity-60';
const btnLine = 'inline-flex min-h-11 items-center justify-center rounded border border-green-600 px-4 py-2 font-semibold text-green-700 transition hover:bg-green-600 hover:text-white disabled:opacity-60';

const SECTIONS = [
  { id: 'subscriptions', title: 'Subscriptions' },
  { id: 'gift-cards', title: 'Gift cards' },
  { id: 'plans', title: 'Plans' },
  { id: 'recipes', title: 'Recipes' },
];

/** Small admin page for the API's admin endpoints (route: #/admin). */
const Admin = () => {
  usePageTitle('Admin', 'Admin panel of the HelloFresh React practice clone: subscriptions, gift cards, plans and recipes.');
  const [session, setSession] = useState(loadSession);
  const [toast, setToast] = useToast();

  const start = (next) => {
    saveSession(next);
    setSession(next);
  };
  const logout = useCallback(
    (message = '') => {
      saveSession(null);
      setSession(null);
      setToast(message);
    },
    [setToast],
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-700">
      {session ? <Panel session={session} onToast={setToast} onLogout={logout} /> : <Login onLogin={start} />}
      {toast}
    </div>
  );
};

const Logo = () => (
  <Link to="/" aria-label="HelloFresh clone home" className="flex min-h-11 items-center">
    <img src={asset('images/logo.png')} alt="HelloFresh logo" width="93" height="30" className="w-24" />
  </Link>
);

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      onLogin(await apiLogin(email.trim(), password));
    } catch (err) {
      // The printed demo login must also work with no API: open the sandbox, as the button does.
      const typedDemo = email.trim().toLowerCase() === DEMO_LOGIN.email && password === DEMO_LOGIN.password;
      if (typedDemo && (err.offline || err.status >= 500 || err.status === 401)) onLogin({ mode: 'sandbox', role: 'demo' });
      else setError(err.offline ? 'The API is offline right now. Use “Demo admin” to try the panel.' : err.message);
    } finally {
      setBusy(false);
    }
  };

  // Read-only demo admin on the API, or the in-browser sandbox when the API is offline.
  const demo = async () => {
    setBusy(true);
    setError('');
    try {
      onLogin(await apiLogin(DEMO_LOGIN.email, DEMO_LOGIN.password));
    } catch (err) {
      if (err.offline || err.status >= 500 || err.status === 401) onLogin({ mode: 'sandbox', role: 'demo' });
      else setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section aria-labelledby="login-title" className="w-full max-w-md rounded-lg bg-white p-6 shadow-sm sm:p-8">
        <Logo />
        <p className="mt-4 text-sm font-bold uppercase tracking-wide text-green-600">Admin</p>
        <h1 id="login-title" className="text-3xl font-semibold text-gray-700">Sign in</h1>
        <p className="mt-2 text-gray-600">Subscriptions, gift cards, plans and recipes.</p>

        <button type="button" onClick={demo} disabled={busy} className={`${btnSolid} mt-6 w-full`}>
          Demo admin
        </button>
        <p className="mt-2 text-sm text-gray-500">
          Public demo login: <span className="font-mono break-all">{DEMO_LOGIN.email}</span> / <span className="font-mono">{DEMO_LOGIN.password}</span> (read-only, changes are not saved).
        </p>

        <form onSubmit={submit} noValidate className="mt-6 space-y-3 border-t pt-6">
          <div>
            <label htmlFor="admin-email" className="mb-1 block font-bold text-gray-700">Email</label>
            <input id="admin-email" type="email" className={input} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
          </div>
          <div>
            <label htmlFor="admin-password" className="mb-1 block font-bold text-gray-700">Password</label>
            <input id="admin-password" type="password" className={input} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
          </div>
          {error && <p className="text-sm text-red-700" role="alert">{error}</p>}
          <button type="submit" disabled={busy || !email || !password} className={`${btnLine} w-full`}>
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </section>
    </main>
  );
};

const Panel = ({ session, onToast, onLogout }) => {
  const [section, setSection] = useState('subscriptions');
  const [drawer, setDrawer] = useState(false);
  const store = useMemo(() => storeFor(session), [session]);
  const sandbox = session.mode === 'sandbox';

  // 403 (demo admin) and validation errors become a toast; 401 ends the session.
  const fail = useCallback(
    (err) => {
      if (err.status === 401) onLogout('Your session expired. Please sign in again.');
      else if (err.offline) onToast('The API did not answer. Try again in a moment.');
      else onToast(err.message);
    },
    [onLogout, onToast],
  );

  useEffect(() => {
    if (!drawer) return undefined;
    const onKey = (e) => e.key === 'Escape' && setDrawer(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [drawer]);

  const nav = (
    <nav aria-label="Admin sections">
      <ul className="space-y-1">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              aria-current={section === s.id ? 'page' : undefined}
              onClick={() => {
                setSection(s.id);
                setDrawer(false);
              }}
              className={`flex min-h-11 w-full items-center rounded px-3 text-left font-semibold transition ${section === s.id ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-green-50 hover:text-green-700'}`}
            >
              {s.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );

  const title = SECTIONS.find((s) => s.id === section).title;

  return (
    <>
      <header className="sticky top-0 z-30 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-3 px-4 py-2 sm:px-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded text-2xl text-gray-700 lg:hidden"
              aria-label="Open admin menu"
              aria-expanded={drawer}
              aria-controls="admin-drawer"
              onClick={() => setDrawer(true)}
            >
              <span aria-hidden="true">☰</span>
            </button>
            <Logo />
            <span className="rounded bg-green-100 px-2 py-0.5 text-sm font-bold text-green-800">Admin</span>
          </div>
          <button type="button" onClick={() => onLogout()} className={btnLine}>
            Log out
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6">
        <aside className="hidden w-52 shrink-0 lg:block">
          <div className="sticky top-20 rounded-lg bg-white p-3 shadow-sm">{nav}</div>
        </aside>

        {drawer && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button type="button" aria-label="Close admin menu" className="absolute inset-0 h-full w-full bg-black/40" onClick={() => setDrawer(false)} />
            <div id="admin-drawer" className="absolute inset-y-0 left-0 w-64 max-w-[80%] bg-white p-4 shadow-lg">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-bold">Menu</span>
                <button type="button" aria-label="Close admin menu" className="flex h-11 w-11 items-center justify-center rounded text-xl" onClick={() => setDrawer(false)}>
                  <span aria-hidden="true">✕</span>
                </button>
              </div>
              {nav}
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1">
          {sandbox ? (
            <p className="mb-4 rounded border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              <strong>Demo mode — changes are not saved.</strong> The API is offline, so this panel runs on the bundled data inside your browser tab.{' '}
              <button
                type="button"
                className="min-h-11 font-semibold text-green-700 underline"
                onClick={() => {
                  resetSandbox();
                  window.location.reload();
                }}
              >
                Reset demo data
              </button>
            </p>
          ) : (
            session.role === 'demo' && (
              <p className="mb-4 rounded border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                <strong>Read-only demo admin — changes are not saved.</strong> Edits are blocked by the server, gift-card codes are masked and customers’ names and emails are hidden.
              </p>
            )
          )}
          <h1 className="mb-4 text-2xl font-semibold text-gray-700 sm:text-3xl">{title}</h1>
          <div className="rounded-lg bg-white p-4 shadow-sm sm:p-6">
            {section === 'subscriptions' && <Subscriptions store={store} onToast={onToast} fail={fail} />}
            {section === 'gift-cards' && <GiftCards store={store} fail={fail} />}
            {section === 'plans' && <Catalog key="plans" kind="plans" store={store} onToast={onToast} fail={fail} />}
            {section === 'recipes' && <Catalog key="recipes" kind="recipes" store={store} onToast={onToast} fail={fail} />}
          </div>
        </main>
      </div>
    </>
  );
};

// Loads a list and reloads it after each change.
const useList = (load, fail, deps) => {
  const [rows, setRows] = useState(null);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    let alive = true;
    load()
      .then((list) => alive && setRows(list))
      .catch((err) => {
        if (alive) setRows([]);
        fail(err);
      });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick, fail]);
  return [rows, () => setTick((n) => n + 1)];
};

const Table = ({ label, head, children }) => (
  // The table scrolls inside its own box; the page never scrolls sideways.
  <div className="relative max-w-full overflow-x-auto rounded border border-gray-200" tabIndex={0} role="region" aria-label={label}>
    <table className="w-full min-w-[640px] border-collapse text-left text-sm">
      <thead className="bg-gray-100 text-xs uppercase tracking-wide text-gray-500">
        <tr>
          {head.map((h) => (
            <th key={h} scope="col" className="whitespace-nowrap px-3 py-2">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">{children}</tbody>
    </table>
  </div>
);

const money = (n) => `$${Number(n).toFixed(2)}`;
const date = (d) => (d ? new Date(d).toLocaleDateString('en-GB') : '—');
const Empty = ({ rows, children }) =>
  rows === null ? <p className="text-gray-500">Loading…</p> : rows.length === 0 ? <p className="text-gray-500">Nothing here yet.</p> : children;

const Subscriptions = ({ store, onToast, fail }) => {
  const [status, setStatus] = useState('');
  const [rows, reload] = useList(() => store.listSubscriptions(status), fail, [store, status]);

  const change = async (reference, next) => {
    try {
      await store.setSubscriptionStatus(reference, next);
      onToast(`${reference} is now ${next}.`);
      reload();
    } catch (err) {
      fail(err);
    }
  };

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <label htmlFor="sub-status" className="font-bold">Status</label>
        <select id="sub-status" className={`${input.replace("w-full ", "")} min-w-40`} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <Empty rows={rows}>
        <Table label="Subscriptions" head={['Reference', 'Customer', 'Plan', 'Box', 'Weekly', 'Created', 'Status']}>
          {(rows || []).map((s) => (
            <tr key={s.reference}>
              <td className="whitespace-nowrap px-3 py-2 font-mono">{s.reference}</td>
              <td className="px-3 py-2">
                {s.name}
                <span className="block text-gray-500">{s.email}</span>
              </td>
              <td className="px-3 py-2">{s.planTitle}</td>
              <td className="whitespace-nowrap px-3 py-2">{s.people} people · {s.meals} meals</td>
              <td className="px-3 py-2">{money(s.weeklyTotal)}</td>
              <td className="px-3 py-2">{date(s.createdAt)}</td>
              <td className="px-3 py-2">
                <label className="sr-only" htmlFor={`st-${s.reference}`}>Status of {s.reference}</label>
                <select id={`st-${s.reference}`} className={`${input.replace("w-full ", "")} w-36`} value={s.status} onChange={(e) => change(s.reference, e.target.value)}>
                  {STATUSES.map((x) => <option key={x} value={x}>{x}</option>)}
                </select>
              </td>
            </tr>
          ))}
        </Table>
      </Empty>
    </>
  );
};

const GiftCards = ({ store, fail }) => {
  const [rows] = useList(() => store.listGiftCards(), fail, [store]);
  return (
    <Empty rows={rows}>
      <p className="mb-3 text-sm text-gray-500">Every card is a demo card: this practice project takes no payments.</p>
      <Table label="Gift cards" head={['Code', 'Amount', 'Balance', 'To', 'From', 'Created']}>
        {(rows || []).map((c) => (
          <tr key={c.code}>
            <td className="whitespace-nowrap px-3 py-2 font-mono">{c.code}</td>
            <td className="px-3 py-2">{money(c.amount)}</td>
            <td className="px-3 py-2">{money(c.balance)}</td>
            <td className="px-3 py-2">{c.to}</td>
            <td className="px-3 py-2">{c.from}</td>
            <td className="px-3 py-2">{date(c.createdAt)}</td>
          </tr>
        ))}
      </Table>
    </Empty>
  );
};

const FIELDS = {
  plans: [
    { name: 'slug', label: 'Slug' },
    { name: 'title', label: 'Title' },
    { name: 'tagline', label: 'Tagline' },
    { name: 'pricePerServing', label: 'Price per serving ($)', type: 'number', step: '0.01' },
    { name: 'image', label: 'Image path' },
    { name: 'text', label: 'Description', wide: true },
  ],
  recipes: [
    { name: 'slug', label: 'Slug' },
    { name: 'title', label: 'Title' },
    { name: 'plan', label: 'Plan (slug)' },
    { name: 'time', label: 'Time (minutes)', type: 'number' },
    { name: 'tags', label: 'Tags (comma separated)' },
    { name: 'image', label: 'Image path' },
  ],
};

const blank = {
  plans: { slug: '', title: '', tagline: '', pricePerServing: 7.49, image: 'images/page4-2.jpg', text: '' },
  recipes: { slug: '', title: '', plan: 'veggie', time: 30, tags: '', image: 'images/page4-1.jpg' },
};

const Catalog = ({ kind, store, onToast, fail }) => {
  const api = store[kind];
  const [rows, reload] = useList(() => api.list(), fail, [api]);
  const [editing, setEditing] = useState(null); // { original, draft }
  const label = kind === 'plans' ? 'plan' : 'recipe';

  const run = async (action, ok) => {
    try {
      await action();
      onToast(ok);
      reload();
      return true;
    } catch (err) {
      fail(err);
      return false;
    }
  };

  const save = async (draft) => {
    const body = { ...draft };
    if (kind === 'recipes') body.tags = String(draft.tags).split(',').map((t) => t.trim()).filter(Boolean);
    if (await run(() => api.save(body, editing.original), editing.original ? `The ${label} was updated.` : `The ${label} was added.`)) setEditing(null);
  };

  const edit = (row) => {
    const draft = Object.fromEntries(FIELDS[kind].map((f) => [f.name, row[f.name] ?? '']));
    if (kind === 'recipes') draft.tags = (row.tags || []).join(', ');
    setEditing({ original: row.slug, draft });
  };

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-500">{rows ? `${rows.length} ${kind}` : ''}</p>
        <button type="button" className={btnSolid} onClick={() => setEditing({ original: null, draft: { ...blank[kind] } })}>
          Add {label}
        </button>
      </div>

      {editing && <ItemForm key={editing.original || 'new'} kind={kind} editing={editing} onSave={save} onCancel={() => setEditing(null)} />}

      <Empty rows={rows}>
        <Table
          label={kind}
          head={kind === 'plans' ? ['Title', 'Slug', 'Price / serving', 'Active', 'Actions'] : ['Title', 'Plan', 'Time', 'Tags', 'Active', 'Actions']}
        >
          {(rows || []).map((r) => (
            <tr key={r.slug} className={r.active === false ? 'text-gray-400' : ''}>
              <td className="px-3 py-2 font-semibold">{r.title}</td>
              {kind === 'plans' ? (
                <>
                  <td className="px-3 py-2 font-mono">{r.slug}</td>
                  <td className="px-3 py-2">{money(r.pricePerServing)}</td>
                </>
              ) : (
                <>
                  <td className="px-3 py-2 font-mono">{r.plan}</td>
                  <td className="whitespace-nowrap px-3 py-2">{r.time} min</td>
                  <td className="px-3 py-2">{(r.tags || []).join(', ')}</td>
                </>
              )}
              <td className="px-3 py-2">
                <button
                  type="button"
                  aria-pressed={r.active !== false}
                  aria-label={`${r.title} active`}
                  onClick={() => run(() => api.save({ active: r.active === false }, r.slug), r.active === false ? `${r.title} is visible again.` : `${r.title} is hidden.`)}
                  className={`min-h-11 min-w-16 rounded-full border-2 px-3 font-semibold ${r.active !== false ? 'border-green-600 bg-green-50 text-green-700' : 'border-gray-300 bg-gray-100 text-gray-500'}`}
                >
                  {r.active !== false ? 'On' : 'Off'}
                </button>
              </td>
              <td className="px-3 py-2">
                <div className="flex gap-2">
                  <button type="button" className={btnLine} onClick={() => edit(r)}>Edit</button>
                  <ConfirmButton label="Delete" onConfirm={() => run(() => api.remove(r.slug), `The ${label} was deleted.`)} />
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </Empty>
    </>
  );
};

const ItemForm = ({ kind, editing, onSave, onCancel }) => {
  const [draft, setDraft] = useState(editing.draft);
  const set = (name, value) => setDraft((d) => ({ ...d, [name]: value }));
  const submit = (e) => {
    e.preventDefault();
    const out = { ...draft };
    FIELDS[kind].forEach((f) => {
      if (f.type === 'number') out[f.name] = Number(out[f.name]);
    });
    onSave(out);
  };
  return (
    <form onSubmit={submit} className="mb-6 rounded border border-gray-200 bg-gray-50 p-4">
      <h2 className="mb-3 text-lg font-bold">{editing.original ? `Edit ${editing.original}` : `New ${kind === 'plans' ? 'plan' : 'recipe'}`}</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {FIELDS[kind].map((f) => (
          <div key={f.name} className={f.wide ? 'sm:col-span-2' : ''}>
            <label htmlFor={`f-${f.name}`} className="mb-1 block font-bold">{f.label}</label>
            <input
              id={`f-${f.name}`}
              className={input}
              type={f.type || 'text'}
              step={f.step}
              value={draft[f.name]}
              disabled={f.name === 'slug' && !!editing.original}
              onChange={(e) => set(f.name, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="submit" className={btnSolid}>Save</button>
        <button type="button" className={btnLine} onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

// Two-step delete button. window.confirm() is blocked inside a sandboxed iframe (no allow-modals),
// so the first tap arms the button and the second one confirms; it disarms after 4 s.
const ConfirmButton = ({ label, onConfirm }) => {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (!armed) return undefined;
    const id = setTimeout(() => setArmed(false), 4000);
    return () => clearTimeout(id);
  }, [armed]);
  return (
    <button
      type="button"
      onClick={() => {
        if (!armed) return setArmed(true);
        setArmed(false);
        onConfirm();
      }}
      className={`inline-flex min-h-11 items-center whitespace-nowrap rounded border px-4 py-2 font-semibold transition ${armed ? 'border-red-600 bg-red-50 text-red-700' : 'border-gray-300 text-red-700 hover:border-red-600'}`}
    >
      {armed ? 'Tap again to confirm' : label}
    </button>
  );
};

export default Admin;
