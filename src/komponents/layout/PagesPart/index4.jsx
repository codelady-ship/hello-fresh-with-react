import React from 'react';
import { Link } from 'react-router-dom';
import Slider from "./index4-slayder"
const PagesP1 = () => {
  return (
    <div className="">
       <h2 className='block text-center py-5 text-2xl text-gray-600'>Over 30+ fresh recipes every week</h2>
       <p className='block text-center py-5  text-gray-700 text-xl'>Easy meals designed by professional chefs and nutritionists</p>
       <Slider/>
      <Link to="./OurPlans/index.jsx" className="bg- white text-green-500 py-2 px-8 rounded  border -green-500 hover:bg-green-800 transition duration-300  ml-[45%] mt-15 ">
        Get started
      </Link>
    </div>
  );
};

export default PagesP1;
