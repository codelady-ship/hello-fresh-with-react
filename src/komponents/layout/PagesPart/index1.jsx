import React from 'react';
import { Link } from 'react-router-dom';
import { asset } from '../../../data/site';

// Hero section (the only h1 on the home page)
const PagesP1 = () => {
  return (
    <section
      style={{ backgroundImage: `url(${asset('images/page1.webp')})` }}
      className="flex min-h-[60vh] flex-col items-center justify-center bg-cover bg-center px-5 pt-24 text-center lg:min-h-[85vh]"
    >
      <div className="rounded-lg bg-white/80 px-6 py-5 lg:bg-transparent">
        <h1 className="mb-2 text-3xl font-semibold text-gray-700 lg:text-4xl">
          Take the stress <br />
          out of mealtime
        </h1>
        <p className="mb-4 text-gray-700 lg:text-lg">America's Most Popular Meal Kit</p>
        <Link to="/OurPlans" className="inline-block rounded bg-green-600 px-6 py-2 font-semibold text-white transition duration-300 hover:bg-green-700">
          View our plans
        </Link>
      </div>
    </section>
  );
};

export default PagesP1;
