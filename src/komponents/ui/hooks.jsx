import React, { useEffect, useState } from 'react';

const DEFAULT_TITLE = 'HelloFresh React Clone | Practice Project';
const DEFAULT_DESC =
  'A React + Vite + Tailwind CSS practice clone of the HelloFresh meal-kit website with a plan builder, recipe filter, gift card preview and sustainability pages.';

// Sets the browser tab title and the meta/OG description for each page.
export const usePageTitle = (title, description) => {
  useEffect(() => {
    document.title = title ? `${title} | HelloFresh React Clone` : DEFAULT_TITLE;
    const desc = description || DEFAULT_DESC;
    for (const sel of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) {
      document.querySelector(sel)?.setAttribute('content', desc);
    }
    for (const sel of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
      document.querySelector(sel)?.setAttribute('content', document.title);
    }
  }, [title, description]);
};

// Small notice shown after form actions (API result, or a demo note when the API is offline).
export const useToast = () => {
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (!message) return undefined;
    const t = setTimeout(() => setMessage(''), 5000);
    return () => clearTimeout(t);
  }, [message]);
  const toast = message ? (
    <div role="status" className="fixed bottom-5 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 rounded bg-gray-800 px-5 py-3 text-center text-white shadow-lg">
      {message}
    </div>
  ) : null;
  return [toast, setMessage];
};

// Demo gift cards created while the API is offline live in sessionStorage so the
// "Our Plans" page can redeem them in the same tab. Wrapped in try/catch: storage may be blocked.
const DEMO_KEY = 'hf-clone-demo-gift-cards';
export const readDemoCards = () => {
  try {
    return JSON.parse(sessionStorage.getItem(DEMO_KEY) || '{}') || {};
  } catch {
    return {};
  }
};
export const saveDemoCard = (code, amount) => {
  try {
    sessionStorage.setItem(DEMO_KEY, JSON.stringify({ ...readDemoCards(), [code]: amount }));
  } catch {
    // storage blocked: the code still shows on screen
  }
};
