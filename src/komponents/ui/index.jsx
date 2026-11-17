import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Green header band used by every inner page (one h1 per page).
export const PageHeader = ({ eyebrow, title, intro, children }) => (
  <section className="bg-gray-100 px-5 py-12 text-center sm:px-10">
    {eyebrow && <p className="mb-2 text-sm font-bold uppercase tracking-wide text-green-600">{eyebrow}</p>}
    <h1 className="mx-auto max-w-3xl text-3xl font-semibold text-gray-700 sm:text-4xl">{title}</h1>
    {intro && <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">{intro}</p>}
    {children}
  </section>
);

export const Section = ({ title, children, className = '' }) => (
  <section className={`mx-auto max-w-6xl px-5 py-10 sm:px-10 ${className}`}>
    {title && <h2 className="mb-6 text-center text-2xl text-gray-600 sm:text-3xl">{title}</h2>}
    {children}
  </section>
);

export const ButtonLink = ({ to, children, variant = 'solid' }) => (
  <Link
    to={to}
    className={
      variant === 'solid'
        ? 'inline-flex min-h-11 items-center justify-center rounded bg-green-600 px-8 py-2 font-semibold text-white transition duration-300 hover:bg-green-700'
        : 'inline-flex min-h-11 items-center justify-center rounded border border-green-600 px-8 py-2 font-semibold text-green-700 transition duration-300 hover:bg-green-600 hover:text-white'
    }
  >
    {children}
  </Link>
);

export const PracticeNote = () => (
  <p className="mx-auto max-w-2xl px-5 pb-10 text-center text-sm text-gray-500">
    This page is part of a practice clone built for learning React. Plans, prices and gift cards shown here are examples only.
  </p>
);

// Confirmation panel shown after a demo form is completed. Focus moves to it so
// keyboard and screen-reader users get the result; it stays until "Start over".
export const DemoConfirmation = ({ title, children, onReset, resetLabel = 'Start over' }) => {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <div ref={ref} tabIndex={-1} role="status" className="rounded-lg border-2 border-green-600 bg-white p-6 shadow-sm focus:outline-none">
      <p className="mb-2 inline-block rounded bg-amber-100 px-2 py-0.5 text-sm font-bold uppercase tracking-wide text-amber-800">Demo only</p>
      <h3 className="text-xl font-bold text-gray-700">{title}</h3>
      <div className="mt-3 space-y-2 text-gray-600">{children}</div>
      <p className="mt-4 text-sm text-gray-500">This is a practice project: nothing was sent, ordered or charged.</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 inline-flex min-h-11 items-center rounded border border-green-600 px-6 py-2 font-semibold text-green-700 transition hover:bg-green-600 hover:text-white"
      >
        {resetLabel}
      </button>
    </div>
  );
};
