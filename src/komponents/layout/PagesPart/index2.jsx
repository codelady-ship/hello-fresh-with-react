import React from 'react';
import { Link } from 'react-router-dom';

const PagesP1 = () => {
  return (
    <div className='bg-gray-100 py-5'>
      <h2 className='block text-center py-5 text-3xl text-gray-600'>
        Why HelloFresh?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-5 py-10">
        {/* First */}
        <div className='flex flex-col justify-evenly items-center gap-5'>
          <img src="/images/page2-1.png" />
          <p className='font-bold text-center'>No skimpin’ on the chicken!</p>
          <p className='text-center'>Steak, or fish, or plant protein.</p>
        </div>

        {/* Second */}
        <div className='flex flex-col justify-evenly items-center gap-5'>
          <img src="/images/page2-2.png"/>
          <p className='font-bold text-center'>No commitment whatsoever</p>
          <p className='text-center'>Skipping weeks or cancelling is super easy.</p>
        </div>

        {/* Third */}
        <div className='flex flex-col justify-evenly items-center gap-5'>
          <img src="/images/page2-3.png" />
          <p className='font-bold text-center'>The most 5-star reviews</p>
          <p className='text-center'>Our huge recipe selection wows week after week.</p>
        </div>

        {/* Fourth */}
        <div className='flex flex-col justify-evenly items-center gap-5'>
          <img src="/images/page2-4.png"/>
          <p className='font-bold text-center'>Fresh and affordable</p>
          <p className='text-center'>Chef-created deliciousness from $7.49 per meal.</p>
        </div>
      </div>
      <Link to="./OurPlans/index.jsx" className="bg-green-500 text-white py-2 px-8 rounded hover:bg-green-600 transition duration-300  ml-[45%] mb-15">
        Get started
      </Link>
    </div>
  );
};

export default PagesP1;
