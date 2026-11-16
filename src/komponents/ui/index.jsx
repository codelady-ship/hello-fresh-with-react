import React from 'react';
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
        ? 'inline-block rounded bg-green-600 px-8 py-2 font-semibold text-white transition duration-300 hover:bg-green-700'
        : 'inline-block rounded border border-green-600 px-8 py-2 font-semibold text-green-700 transition duration-300 hover:bg-green-600 hover:text-white'
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
