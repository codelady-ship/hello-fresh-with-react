import React from 'react';
import { Link } from 'react-router-dom';
import { asset } from '../../../data/site';

const items = [
  'High-quality ingredients sourced straight from the farm',
  'Easy-to-follow recipes with clear nutritional info',
  'Convenient meal kits that fit perfectly in the fridge',
  'A fun cooking experience that makes you feel unstoppable',
];

const PagesP3 = () => {
  return (
    <section className="mx-auto my-10 flex max-w-6xl flex-col items-center gap-10 px-5 lg:flex-row">
      <img
        src={asset('images/page3.webp')}
        alt="Meal kit box with fresh vegetables, salmon and recipe cards"
        width="655"
        height="414"
        loading="lazy"
        className="w-full lg:w-1/2"
      />
      <div className="flex flex-col items-center lg:w-1/2 lg:items-start">
        <h2 className="py-4 text-center text-3xl text-gray-600 lg:text-left">What’s inside each box?</h2>
        <ul className="mb-5">
          {items.map((i) => (
            <li key={i} className="py-2 text-lg text-gray-600">✓ {i}</li>
          ))}
        </ul>
        <Link to="/OurPlans" className="rounded bg-green-600 px-8 py-2 font-semibold text-white transition duration-300 hover:bg-green-700">
          View our plans
        </Link>
      </div>
    </section>
  );
};

export default PagesP3;
