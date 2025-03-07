import React from 'react';
import { Link } from 'react-router-dom';

const PagesP1 = () => {
  return (
    <div 
      style={{ backgroundImage: 'url(/public/images/page1.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      className=" sx:h-[105rem] lg:h-[100vh] flex flex-col items-center justify-center text-center "
    >
      <h1 className="text-gray-700 lg:text-4xl mt-10 mb-2">
        Take the stress <br />
        out of mealtime
      </h1>
      <p className="text-gray-700 lg:text-lg mb-3">America's Most Popular Meal Kit</p>
      <Link to="./OurPlans/index.jsx" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 mb-2">
      <h2>View our plans</h2>  
      </Link>
    </div>
  );
};

export default PagesP1;
