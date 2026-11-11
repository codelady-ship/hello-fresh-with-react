import React from 'react';
import { Link } from 'react-router-dom';

const PagesP1 = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-10 mx-5 lg:mx-30 mb-5 mt-10">
      {/* Image Section */}
      <img 
        src="images/page3.png" 
        alt="What’s inside each box?" 
        className="w-full lg:w-1/2 p-5" 
      />

      {/* Text Section */}
      <div className="lg:w-1/2 flex flex-col items-center lg:items-start">
        <p className="text-center lg:text-left py-5 text-3xl text-gray-600">What’s inside each box?</p>
        <p className="py-2 text-xl text-gray-600">✓ Easy-to-follow recipes with clear nutritional info</p>
        <p className="py-2 text-xl text-gray-600">✓ High-quality ingredients sourced straight from the farm</p>
        <p className="py-2 text-xl text-gray-600">✓ Convenient meal kits that fit perfectly in the fridge</p>
        <p className="py-2 text-xl text-gray-600">✓ A fun cooking experience that makes you feel unstoppable</p>
        <p className="py-2 text-xl text-gray-600 mb-5">✓ Innovative packaging designed to reduce waste</p>
        <Link 
          to="/OurPlans" 
          className="bg-green-500 text-white py-2 px-8 rounded hover:bg-green-800 transition duration-300 self-center lg:self-start"
        >
          View our plans
        </Link>
      </div>
    </div>
  );
};

export default PagesP1;
