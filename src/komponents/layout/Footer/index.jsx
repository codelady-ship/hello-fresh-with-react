import React from 'react';
import { Link } from 'react-router-dom';

const PagesP1 = () => {
  return (
    <div >
      
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-2 px-5 ">
        {/* 1 */}
        <div className='flex flex-col items-start gap-0 p-5'>
          <p className='font-bold text-center '>HelloFresh</p>
          <Link className='text-green-500'>Students</Link>
          <Link className='text-green-500'>Blog</Link>
          <Link className='text-green-500'>ReciLinkes</Link>
          <Link className='text-green-500'>Hero Discounts</Link>
          <Link className='text-green-500'>ReciLinke Directory</Link>
        </div>

        {/* 2 */}
          <div className='flex flex-col items-start gap-0 p-5'>
          <p className='font-bold text-center'>Our company</p>
          <Link className='text-green-500'>HelloFresh GrouLink</Link>
          <Link className='text-green-500'>Blog</Link>
          <Link className='text-green-500'>Careers</Link>
          <Link className='text-green-500'>Sustainability</Link>
        </div>
        
        {/* 3 */}
        <div className='flex flex-col items-start gap-0 p-5'>
          <p className='font-bold text-center'>Work with us</p>
          <Link className='text-green-500'>Partnership Inquiries</Link>
          <Link className='text-green-500'>Download our app</Link>
          <Link className='text-green-500'>Careers</Link>
        </div>

        {/* 4 */}
        <div className='flex flex-col items-start gap-0 p-5'>
          <p className='font-bold text-center'>Partner</p>
          <Link className='text-green-500'>Influencers</Link>
          <Link className='text-green-500'>Affiliates</Link>
        </div>
        {/* 5 */}
        <div className='flex flex-col items-start gaLink-0 p-5'>
          <p className='font-bold text-center'>Contact us</p>
          <div className='flex gap-2'>
          <Link className=''> <img src="images/fb.png" /></Link>
          <Link ><img src="images/tviter.png" className='rounded-2xl  bg-blue-500 p-1.5 ' /></Link>
          <Link ><img src="images/insta.png " className='rounded-2xl  bg-red-500 p-1.5 ' /></Link>
          </div>
        </div>
      </div>
      <div className='flex gap-5 border-y-2 px-10 py-3 ' >
        <Link  className='font-bold text-center'>© HelloFresh 2022</Link>
        <Link className='text-green-500'>Terms and Conditions</Link>
      <Link className='text-green-500'>Privacy</Link>
      <Link className='text-green-500'>Accessibility</Link>
      </div>
    </div>
  );
};

export default PagesP1;
