import React from 'react';
import { Link } from 'react-router-dom';

const PagesP1 = () => {
  return (
    <div >
      <h2 className='block text-center pt-5 text-3xl text-gray-600'>
      Cook it. Love it. Tag it #HelloFreshPics
      </h2>
      <p className='block text-center pt-2  text-gray-700 text-xl'>Follow us on Instagram @hellofresh</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-5 ">
        {/* First */}
        <div className='flex flex-col justify-evenly items-center gap-5 p-5'>
          <img src="images/page5-1.png"  />
          <p className='font-bold text-center m-[-30px]'>bdanielle1285</p>
          <p className='text-center'>My little chef helping me make dinner tonight and trying out some of his new kitchen utensils I got him!</p>
        </div>

        {/* Second */}
        <div className='flex flex-col justify-evenly items-center gap-5'>
          <img src="images/page5-2.png " className='p-4'/>
          <p className='font-bold text-center m-[-30px]'>lilpepthekelpie</p>
          <p className='text-center'>I’m helping out 🧑🏽‍🍳 #masterchef #bestboy.</p>
        </div>

        {/* Third */}
        <div className='flex flex-col justify-evenly items-center gap-5'>
          <img src="images/page5-3.png" className='p-5' />
          <p className='font-bold text-center m-[-30px]'>mandi14eid</p>
          <p className='text-center'>Drew and the kids made mom dinner tonight! Drew and I had our doubts but WOW was it tasty.</p>
        </div>

        {/* Fourth */}
        <div className='flex flex-col justify-evenly items-center gap-5'>
          <img src="images/page5-4.png" className='p-5'/>
          <p className='font-bold text-center m-[-30px]'>our_lovely_stride </p>
          <p className='text-center'>We had a cooking class yesterday and we had such an amazing time. 😁 They had such a great time working as a team and I can’t wait for our weekly cooking class 🙌🏻😁</p>
        </div>
      </div>
      
    </div>
  );
};

export default PagesP1;
