import React from 'react';
import { Link } from 'react-router-dom';

const PagesP1 = () => {
  return (
    <div 
      style={{ backgroundImage: 'url(images/page6.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      className=" sx:h-[105rem] lg:h-[30vh] flex flex-col items-center justify-center text-center mt-5 pt-2"
    >
      <h1 className="text-gray-700 lg:text-4xl mt-10 mb-2">
      Flexible Plans
      </h1>
      <p className="text-gray-700 lg:text-lg mb-3">to meet your household's needs</p>
      <Link to="/OurPlans" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 mb-2">
      <h2>View our plans</h2>  
      </Link>
    </div>
  );
};

export default PagesP1;
