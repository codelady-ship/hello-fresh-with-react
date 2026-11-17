import React from 'react';
import { Link } from 'react-router-dom';
import { asset } from '../../../data/site';

const PagesP6 = () => {
  return (
    <section
      style={{ backgroundImage: `url(${asset('images/page6.webp')})` }}
      className="mt-5 flex min-h-[16rem] flex-col items-center justify-center bg-cover bg-center px-5 text-center"
    >
      <div className="rounded-lg bg-white/85 px-6 py-4">
        <h2 className="mb-1 text-3xl text-gray-700">Flexible Plans</h2>
        <p className="mb-3 text-gray-700 lg:text-lg">to meet your household's needs</p>
        <Link to="/OurPlans" className="inline-flex min-h-11 items-center rounded bg-green-600 px-6 py-2 font-semibold text-white transition duration-300 hover:bg-green-700">
          View our plans
        </Link>
      </div>
    </section>
  );
};

export default PagesP6;
