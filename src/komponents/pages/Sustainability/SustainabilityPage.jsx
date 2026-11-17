import React from 'react';
import { NavLink } from 'react-router-dom';
import { PageHeader, Section, ButtonLink, PracticeNote } from '../../ui';
import { usePageTitle } from '../../ui/hooks';
import { topics } from '../../../data/site';

// Shared layout for the three sustainability pages.
const SustainabilityPage = ({ title, intro, points, tip, description }) => {
  usePageTitle(title, description);
  return (
    <>
      <PageHeader eyebrow="Sustainability" title={title} intro={intro}>
        <nav aria-label="Sustainability topics" className="mt-6 flex flex-wrap justify-center gap-3">
          {topics.map((t) => (
            <NavLink
              key={t.path}
              to={t.path}
              className={({ isActive }) =>
                `inline-flex min-h-11 items-center rounded-full border px-4 py-1.5 font-semibold transition ${isActive ? 'border-green-600 bg-green-600 text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-green-600'}`
              }
            >
              {t.title}
            </NavLink>
          ))}
        </nav>
      </PageHeader>

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {points.map((p) => (
            <article key={p.title} className="rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="mb-2 text-xl font-bold text-gray-700">{p.title}</h2>
              <p className="text-gray-600">{p.text}</p>
            </article>
          ))}
        </div>
        {tip && (
          <p className="mx-auto mt-8 max-w-3xl rounded-lg bg-green-50 p-5 text-center text-green-800">
            <strong>Tip:</strong> {tip}
          </p>
        )}
        <div className="mt-10 text-center"><ButtonLink to="/OurMenu" variant="outline">See the menu</ButtonLink></div>
      </Section>
      <PracticeNote />
    </>
  );
};

export default SustainabilityPage;
