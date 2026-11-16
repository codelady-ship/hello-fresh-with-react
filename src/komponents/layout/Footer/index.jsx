import React from 'react';
import { Link } from 'react-router-dom';
import { asset, topics } from '../../../data/site';

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
          <ul className="space-y-1">
            {col.links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-green-700 hover:underline">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div>
        <h2 className="mb-2 font-bold text-gray-700">Source code</h2>
        <a
          href="https://github.com/codelady-ship/hello-fresh-with-react"
          className="text-green-700 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          View on GitHub
        </a>
        <div className="mt-3 flex gap-2" aria-hidden="true">
          <img src={asset('images/fb.png')} alt="" className="h-7 w-7" />
          <img src={asset('images/tviter.png')} alt="" className="h-7 w-7 rounded-2xl bg-blue-500 p-1.5" />
          <img src={asset('images/insta.png')} alt="" className="h-7 w-7 rounded-2xl bg-red-500 p-1.5" />
        </div>
      </div>
    </div>
    <p className="border-t border-gray-300 px-5 py-4 text-center text-sm text-gray-600">
      Practice clone of the HelloFresh website, built with React for learning. Not affiliated with HelloFresh.
    </p>
  </footer>
);

export default Footer;
