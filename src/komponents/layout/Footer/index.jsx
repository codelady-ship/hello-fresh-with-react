import React from 'react';
import { Link } from 'react-router-dom';
import { topics } from '../../../data/site';

const columns = [
  {
    title: 'Plans & menus',
    links: [
      { to: '/OurPlans', label: 'Our Plans' },
      { to: '/OurMenu', label: 'Our Menu' },
      { to: '/ThanksgivingBoxs', label: 'Thanksgiving Box' },
    ],
  },
  {
    title: 'Gifts',
    links: [{ to: '/GiftCards', label: 'Gift Cards' }],
  },
  {
    title: 'Sustainability',
    links: topics.map((t) => ({ to: t.path, label: t.title })),
  },
];

const Footer = () => (
  <footer className="mt-10 bg-gray-100">
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
      {columns.map((col) => (
        <div key={col.title}>
          <h2 className="mb-2 font-bold text-gray-700">{col.title}</h2>
          <ul>
            {col.links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="inline-flex min-h-11 items-center text-green-700 hover:underline">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div>
        <h2 className="mb-2 font-bold text-gray-700">Source code</h2>
        <a
          href="https://github.com/codelady-ship/hello-fresh-with-react"
          className="inline-flex min-h-11 items-center text-green-700 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          View on GitHub<span className="sr-only"> (opens in a new tab)</span>
        </a>
        <a
          href="https://github.com/codelady-ship"
          className="flex min-h-11 w-fit items-center gap-2 font-semibold text-gray-700 hover:text-green-700 hover:underline"
          target="_blank"
          rel="noreferrer"
          aria-label="codelady-ship on GitHub (opens in a new tab)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          codelady-ship
        </a>
      </div>
    </div>
    <p className="border-t border-gray-300 px-5 py-4 text-center text-sm text-gray-600">
      Practice clone of the HelloFresh website, built with React for learning. Not affiliated with HelloFresh.
    </p>
  </footer>
);

export default Footer;
