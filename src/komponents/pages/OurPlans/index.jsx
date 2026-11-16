import React, { useState } from 'react';
import { PageHeader, Section, PracticeNote } from '../../ui';
import { usePageTitle, useToast } from '../../ui/hooks';
import { plans, asset, PRICE_PER_SERVING } from '../../../data/site';

const peopleOptions = [2, 4];
const mealOptions = [2, 3, 4, 5];

const OurPlans = () => {
  usePageTitle('Our Plans');
  const [planId, setPlanId] = useState(plans[0].id);
  const [people, setPeople] = useState(2);
  const [meals, setMeals] = useState(3);
  const [toast, showToast] = useToast();

  const servings = people * meals;
  const total = (servings * PRICE_PER_SERVING).toFixed(2);
  const plan = plans.find((p) => p.id === planId);

  const optionClass = (active) =>
    `rounded border px-4 py-2 font-semibold transition ${active ? 'border-green-600 bg-green-600 text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-green-600'}`;

  return (
    <>
      <PageHeader
        eyebrow="Our Plans"
        title="Pick a plan that fits your week"
        intro="Choose a recipe style, the number of people and how many meals you want. You can change everything later."
      />

      <Section title="1. Choose your preferences">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPlanId(p.id)}
              aria-pressed={planId === p.id}
              className={`overflow-hidden rounded-lg border-2 bg-white text-left shadow-sm transition ${planId === p.id ? 'border-green-600' : 'border-transparent hover:border-green-300'}`}
            >
              <img src={asset(p.image)} alt={p.alt} className="h-44 w-full object-cover" loading="lazy" />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-700">{p.title}</h3>
                <p className="text-sm uppercase text-green-700">{p.tagline}</p>
                <p className="mt-2 text-gray-600">{p.text}</p>
              </div>
            </button>
          ))}
        </div>
      </Section>

      <Section title="2. Choose your plan size" className="bg-gray-100 sm:rounded-lg">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <fieldset>
              <legend className="mb-2 font-bold text-gray-700">Number of people</legend>
              <div className="flex flex-wrap gap-3">
                {peopleOptions.map((n) => (
                  <button key={n} type="button" className={optionClass(people === n)} aria-pressed={people === n} onClick={() => setPeople(n)}>{n} people</button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="mb-2 font-bold text-gray-700">Meals per week</legend>
              <div className="flex flex-wrap gap-3">
                {mealOptions.map((n) => (
                  <button key={n} type="button" className={optionClass(meals === n)} aria-pressed={meals === n} onClick={() => setMeals(n)}>{n} meals</button>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-700">Your plan summary</h3>
            <dl className="mt-4 space-y-2 text-gray-600">
              <div className="flex justify-between"><dt>Plan</dt><dd className="font-semibold">{plan.title}</dd></div>
              <div className="flex justify-between"><dt>Servings per week</dt><dd className="font-semibold">{servings}</dd></div>
              <div className="flex justify-between"><dt>Price per serving</dt><dd className="font-semibold">${PRICE_PER_SERVING}</dd></div>
              <div className="flex justify-between border-t pt-2 text-lg"><dt>Example weekly total</dt><dd className="font-bold text-green-700">${total}</dd></div>
            </dl>
            <button
              type="button"
              onClick={() => showToast(`Demo only: "${plan.title}" for ${people} people, ${meals} meals a week. Nothing was ordered.`)}
              className="mt-6 w-full rounded bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Select this plan
            </button>
          </div>
        </div>
      </Section>

      <PracticeNote />
      {toast}
    </>
  );
};

export default OurPlans;
