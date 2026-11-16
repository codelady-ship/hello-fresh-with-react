import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const faqs = [
  { q: 'How does a meal kit delivery service work?', a: 'You choose a plan and your recipes from the weekly menu. A box with pre-portioned ingredients and step-by-step recipe cards is delivered to your door.' },
  { q: 'Which meal plans can I try here?', a: 'This clone shows four example plans: Meat & Veggies, Veggie, Family Friendly and Fit & Wholesome. Open "Our Plans" to build one.' },
  { q: 'Is there nutrition information?', a: 'Yes. Each recipe card in a meal kit lists its nutritional information.' },
  { q: 'Can I skip a week of delivery?', a: 'Yes. As the "Why HelloFresh?" section says, skipping weeks or cancelling is meant to be easy.' },
  { q: 'How do I recycle the box?', a: 'See the packaging page for tips on sorting the box, bags and ice packs:', link: { to: '/Sustainability/option1', label: 'Packaging & recycling' } },
  { q: 'Is this the official HelloFresh website?', a: 'No. This is a practice clone built to learn React. For real plans, prices and delivery areas, visit the official HelloFresh website.' },
];

const PagesP7 = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggle = (index) => setActiveIndex(activeIndex === index ? null : index);

  return (
    <section className="bg-gray-100 py-10">
      <h2 className="pt-5 text-center text-3xl text-gray-600">More questions?</h2>
      <ul className="mx-auto max-w-3xl space-y-3 px-5 py-8">
        {faqs.map((f, i) => (
          <li key={f.q} className="rounded bg-white shadow-sm">
            <button
              type="button"
              id={`faq-q-${i}`}
              aria-expanded={activeIndex === i}
              aria-controls={`faq-a-${i}`}
              onClick={() => toggle(i)}
              className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left font-bold text-gray-700 hover:text-green-700"
            >
              {f.q}
              <span aria-hidden="true" className="text-green-600">{activeIndex === i ? '−' : '+'}</span>
            </button>
            <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} hidden={activeIndex !== i} className="px-4 pb-4 text-gray-600">
              {f.a}{' '}
              {f.link && <Link to={f.link.to} className="text-green-700 underline">{f.link.label}</Link>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PagesP7;
