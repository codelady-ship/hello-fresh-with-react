import React from 'react';
import { PageHeader, Section, ButtonLink, PracticeNote } from '../../ui';
import { usePageTitle } from '../../ui/hooks';
import { asset } from '../../../data/site';

const menu = [
  { course: 'Main', items: ['Herb-roasted turkey breast', 'Rich gravy'] },
  { course: 'Sides', items: ['Classic bread stuffing', 'Creamy mashed potatoes', 'Roasted green beans'] },
  { course: 'Extras', items: ['Cranberry sauce', 'Pumpkin pie'] },
];

const steps = [
  { title: 'Order ahead', text: 'Add the holiday box to your delivery week before the menu closes.' },
  { title: 'Unpack & plan', text: 'A cooking timeline tells you what to prepare the day before.' },
  { title: 'Cook & share', text: 'Follow the recipe cards and get everything to the table at the same time.' },
];

const ThanksgivingBoxs = () => {
  usePageTitle('Thanksgiving Box', 'An example Thanksgiving meal-kit box in this HelloFresh practice clone: turkey, gravy, stuffing, sides and pie with a step-by-step cooking timeline.');
  return (
    <>
      <PageHeader
        eyebrow="Seasonal"
        title="The Thanksgiving Box"
        intro="Everything for a classic holiday dinner in one box: pre-portioned ingredients and a step-by-step cooking plan."
      />

      <div
        role="img"
        aria-label="A table full of dishes: tacos, rice, a cheesy bake and a bowl of grains"
        className="h-48 bg-cover bg-center sm:h-64"
        style={{ backgroundImage: `url(${asset('images/page6.webp')})` }}
      />

      <Section title="What's on the menu">
        <div className="grid gap-6 sm:grid-cols-3">
          {menu.map((m) => (
            <div key={m.course} className="rounded-lg bg-gray-100 p-6">
              <h3 className="mb-3 text-lg font-bold text-green-700">{m.course}</h3>
              <ul className="space-y-1 text-gray-700">
                {m.items.map((i) => <li key={i}>✓ {i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="How it works" className="text-center">
        <ol className="grid gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="flex flex-col items-center gap-2">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white">{i + 1}</span>
              <h3 className="text-lg font-bold text-gray-700">{s.title}</h3>
              <p className="text-gray-600">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10"><ButtonLink to="/OurPlans">View our plans</ButtonLink></div>
      </Section>
      <PracticeNote />
    </>
  );
};

export default ThanksgivingBoxs;
