import React from 'react';
import { Link } from 'react-router-dom';
import { asset } from '../../../data/site';

const reasons = [
  { img: 'images/page2-1.png', alt: 'Chicken, fish and steak icon', title: 'No skimpin’ on the chicken!', text: 'Or steak, or fish, or plant protein.' },
  { img: 'images/page2-2.png', alt: 'Calendar icon', title: 'No commitment whatsoever', text: 'Skipping weeks or cancelling is super easy.' },
  { img: 'images/page2-4.png', alt: 'Five stars icon', title: 'The most 5-star reviews', text: 'Our huge recipe selection wows week after week.' },
  { img: 'images/page2-3.png', alt: 'Grocery bag with price icon', title: 'Fresh and affordable', text: 'Chef-created deliciousness from $7.49 per meal.' },
];

const PagesP2 = () => {
  return (
    <section className="bg-gray-100 py-10 text-center">
      <h2 className="py-5 text-3xl text-gray-600">Why HelloFresh?</h2>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((r) => (
          <div key={r.title} className="flex flex-col items-center gap-3">
            <img src={asset(r.img)} alt={r.alt} width="120" height="120" />
            <h3 className="font-bold">{r.title}</h3>
            <p>{r.text}</p>
          </div>
        ))}
      </div>
      <Link to="/OurPlans" className="inline-block rounded bg-green-600 px-8 py-2 font-semibold text-white transition duration-300 hover:bg-green-700">
        Get started
      </Link>
    </section>
  );
};

export default PagesP2;
