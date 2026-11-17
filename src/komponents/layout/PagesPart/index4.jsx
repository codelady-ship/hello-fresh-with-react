import React from 'react';
import { Link } from 'react-router-dom';
import Slider from './index4-slayder';

const PagesP4 = () => {
  return (
    <section className="py-10 text-center">
      <h2 className="py-3 text-3xl text-gray-600">Over 30+ fresh recipes every week</h2>
      <p className="pb-6 text-xl text-gray-700">Easy meals designed by professional chefs and nutritionists</p>
      <Slider />
      <Link to="/OurMenu" className="mt-8 inline-flex min-h-11 items-center rounded border border-green-600 px-8 py-2 font-semibold text-green-700 transition duration-300 hover:bg-green-600 hover:text-white">
        View our menu
      </Link>
    </section>
  );
};

export default PagesP4;
