import React from 'react';
import { asset } from '../../../data/site';

const photos = [
  { img: 'images/page5-1.webp', alt: 'A child helping to cook dinner at the kitchen table', title: 'Little chef', text: 'My little chef helped me make dinner tonight and tried out his new kitchen utensils!' },
  { img: 'images/page5-2.webp', alt: 'A family smiling at the dinner table', title: 'Family dinner', text: 'Dad and the kids made mom dinner tonight. We had our doubts, but wow, it was tasty!' },
  { img: 'images/page5-3.webp', alt: 'A boy in a chef hat preparing vegetables', title: 'Helping out', text: 'I’m helping out 🧑🏽‍🍳 #masterchef' },
  { img: 'images/page5-4.webp', alt: 'A dog watching a meal being cooked in the kitchen', title: 'Cooking class', text: 'We had our weekly cooking class at home and worked as a team. 🙌🏻' },
];

const PagesP5 = () => {
  return (
    <section className="py-10 text-center">
      <h2 className="text-3xl text-gray-600">Cook it. Love it. Tag it #HelloFreshPics</h2>
      <p className="pt-2 text-xl text-gray-700">Photos shared by home cooks</p>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 pt-8 sm:grid-cols-2 lg:grid-cols-4">
        {photos.map((p) => (
          <figure key={p.title} className="flex flex-col items-center gap-3">
            <img src={asset(p.img)} alt={p.alt} width="375" height="469" loading="lazy" className="aspect-square w-full max-w-xs object-cover" />
            <figcaption>
              <strong className="block">{p.title}</strong>
              {p.text}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default PagesP5;
