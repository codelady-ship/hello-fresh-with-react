import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PageHeader, Section, ButtonLink, PracticeNote } from '../../ui';
import { usePageTitle } from '../../ui/hooks';
import { asset } from '../../../data/site';
import { useCatalog } from '../../../api';

const OurMenu = () => {
  usePageTitle('Our Menu', 'Browse a sample weekly menu in this HelloFresh practice clone and filter example recipes by plan: Meat & Veggies, Veggie, Family Friendly, Fit.');
  const { state } = useLocation();
  // Plan cards on the home page link here with { plan } so the menu opens pre-filtered.
  const [filter, setFilter] = useState(state?.plan || 'all');
  const { plans, recipes } = useCatalog();
  const shown = filter === 'all' ? recipes : recipes.filter((r) => r.plan === filter);
  const filters = [{ id: 'all', title: 'All recipes' }, ...plans];

  return (
    <>
      <PageHeader
        eyebrow="Our Menu"
        title="This week's sample menu"
        intro="Browse example recipes and filter them by plan. Every recipe comes with step-by-step instructions."
      />

      <Section>
        <div className="mb-8 flex flex-wrap justify-center gap-3" role="group" aria-label="Filter recipes by plan">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`min-h-11 rounded-full border px-4 py-1.5 font-semibold transition ${filter === f.id ? 'border-green-600 bg-green-600 text-white' : 'border-gray-300 text-gray-700 hover:border-green-600'}`}
            >
              {f.title}
            </button>
          ))}
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((r) => (
            <li key={r.id} className="overflow-hidden rounded-lg bg-white shadow-md">
              <img
                src={asset(r.image)}
                alt={r.alt}
                width="640"
                height="769"
                className="h-52 w-full object-cover"
                style={r.position ? { objectPosition: r.position } : undefined}
                loading="lazy"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-700">{r.title}</h2>
                <p className="mt-1 text-sm text-gray-500">
                  {plans.find((p) => p.id === r.plan)?.title} · {r.time} min
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {r.tags.map((t) => (
                    <li key={t} className="rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">{t}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
        {shown.length === 0 && <p className="text-center text-gray-600">No recipes in this plan yet.</p>}

        <div className="mt-10 text-center">
          <ButtonLink to="/OurPlans">Choose a plan</ButtonLink>
        </div>
      </Section>
      <PracticeNote />
    </>
  );
};

export default OurMenu;
