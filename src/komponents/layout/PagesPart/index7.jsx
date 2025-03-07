import React, { useState } from 'react';

const PagesP1 = () => {
  
  const [activeIndex, setActiveIndex] = useState(null);

  
  const toggleForAnswer = (index) => {
   setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className='bg-gray-100 py-5'>
      <h2 className='block text-center pt-5 text-3xl text-gray-600'>
        More questions?
      </h2>
      <div className="grid grid-cols-1 gap-5 px-5 py-10">
        {/* 1 */}
        <div className='flex flex-col justify-evenly items-center gap-5'>
          <p
            className='font-bold text-start bg-amber-300 text-white px-2 py-1 cursor-pointer'
            onClick={() => toggleForAnswer(0)}
          >
            How does HelloFresh’s meal kit delivery service work?
          </p>
          <p className={`text-center ${activeIndex === 0 ? 'block' : 'hidden'}`}>
            Steak, or fish, or plant protein.
          </p>
        </div>

        {/* 2 */}
        <div className='flex flex-col justify-evenly items-center gap-5'>
          <p
            className='font-bold text-center bg-orange-900 text-white px-2 py-1 cursor-pointer'
            onClick={() => toggleForAnswer(1)}
          >
            Which food meal plans & recipes does HelloFresh offer?
          </p>
          <p className={`text-center ${activeIndex === 1 ? 'block' : 'hidden'}`}>
            Skipping weeks or cancelling is super easy.
          </p>
        </div>

        {/* 3 */}
        <div className='flex flex-col justify-evenly items-center gap-5'>
          <p
            className='font-bold text-center bg-pink-300 text-white px-2 py-1 cursor-pointer'
            onClick={() => toggleForAnswer(2)}
          >
            How many times a week does HelloFresh deliver?
          </p>
          <p className={`text-center ${activeIndex === 2 ? 'block' : 'hidden'}`}>
            Our huge recipe selection wows week after week.
          </p>
        </div>

        {/* 4 */}
        <div className='flex flex-col justify-evenly items-center gap-5'>
          <p
            className='font-bold text-center bg-green-900 text-white px-2 py-1 cursor-pointer'
            onClick={() => toggleForAnswer(3)}
          >
            Does HelloFresh give nutrition & calorie information?
          </p>
          <p className={`text-center ${activeIndex === 3 ? 'block' : 'hidden'}`}>
            Chef-created deliciousness from $7.49 per meal.
          </p>
        </div>

        {/* 5 */}
        <div className='flex flex-col justify-evenly items-center gap-5'>
          <p
            className='font-bold text-center bg-indigo-500 text-white px-2 py-1 cursor-pointer'
            onClick={() => toggleForAnswer(4)}
          >
            How do I recycle my HelloFresh box?
          </p>
          <p className={`text-center ${activeIndex === 4 ? 'block' : 'hidden'}`}>
            Chef-created deliciousness from $7.49 per meal.
          </p>
        </div>

        {/* 6 */}
        <div className='flex flex-col justify-evenly items-center gap-5'>
          <p
            className='font-bold text-center bg-orange-400 text-white px-2 py-1 cursor-pointer'
            onClick={() => toggleForAnswer(5)}
          >
            Why should I choose HelloFresh as my meal kit service?
          </p>
          <p className={`text-center ${activeIndex === 5 ? 'block' : 'hidden'}`}>
            Chef-created deliciousness from $7.49 per meal.
          </p>
        </div>

        {/* 7 */}
        <div className='flex flex-col justify-evenly items-center gap-5'>
          <p
            className='font-bold text-center bg-fuchsia-400 text-white px-2 py-1 cursor-pointer'
            onClick={() => toggleForAnswer(6)}
          >
            How much does HelloFresh cost?
          </p>
          <p className={`text-center ${activeIndex === 6 ? 'block' : 'hidden'}`}>
            Chef-created deliciousness from $7.49 per meal.
          </p>
        </div>

        {/* 8 */}
        <div className='flex flex-col justify-evenly items-center gap-5'>
          <p
            className='font-bold text-center bg-emerald-400 text-white px-2 py-1 cursor-pointer'
            onClick={() => toggleForAnswer(7)}
          >
            Does HelloFresh support a healthy lifestyle?
          </p>
          <p className={`text-center ${activeIndex === 7 ? 'block' : 'hidden'}`}>
            Chef-created deliciousness from $7.49 per meal.
          </p>
        </div>

        {/* 9 */}
        <div className='flex flex-col justify-evenly items-center gap-5'>
          <p
            className='font-bold text-center bg-amber-400 text-white px-2 py-1 cursor-pointer'
            onClick={() => toggleForAnswer(8)}
          >
            Can I skip a week of delivery?
          </p>
          <p className={`text-center ${activeIndex === 8 ? 'block' : 'hidden'}`}>
            Chef-created deliciousness from $7.49 per meal.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PagesP1;
