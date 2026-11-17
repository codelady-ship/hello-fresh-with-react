import React, { useEffect, useState } from 'react';

// Sets the browser tab title for each page.
export const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} | HelloFresh React Clone` : 'HelloFresh React Clone | Practice Project';
  }, [title]);
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
