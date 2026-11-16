import React from 'react';
import { asset } from '../../../data/site';

const photos = [
  { img: 'images/page5-1.webp', alt: 'Hands chopping herbs on a white cutting board next to mushrooms', title: 'Prep time', text: 'Herbs and mushrooms chopped and ready before the pan heats up.' },
  { img: 'images/page5-2.webp', alt: 'Tomatoes and onions cooking in a black frying pan', title: 'In the pan', text: 'Tomatoes and onions softening for a quick weeknight sauce.' },
  { img: 'images/page5-3.webp', alt: 'Hands mixing grains and spices in small bowls on a wooden table', title: 'Cooking together', text: 'Measuring grains and spices, one small bowl at a time.' },
  { img: 'images/page5-4.webp', alt: 'Hands placing cherry tomatoes on a wooden board', title: 'Fresh produce', text: 'Vine tomatoes for a simple side salad.' },
];

const PagesP5 = () => {
  return (
    <section className="py-10 text-center">
      <h2 className="text-3xl text-gray-600">Cook it. Love it. Tag it #HelloFreshPics</h2>
      <p className="pt-2 text-xl text-gray-700">A few moments from cooking at home</p>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 pt-8 sm:grid-cols-2 lg:grid-cols-4">
        {photos.map((p) => (
          <figure key={p.title} className="flex flex-col items-center gap-3">
            <img src={asset(p.img)} alt={p.alt} width="600" height="750" loading="lazy" className="aspect-square w-full max-w-xs object-cover" />
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
