import React, { useState } from 'react';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {image: "images/page4-1.jpg", title:"MEAT & VEGGIES", title2:"OUR MOST POPULAR PLAN"},
    {image: "images/page4-2.jpg", title:"VEGGIE", title2:"& PLANT-BASED MEALS"},
    {image: "images/page4-3.jpg", title:"FAMILY FRIENDLY", title2:"KID-TESTED RECIPES"},
    {image: "images/page4-4.jpg", title:"FIT & WHOLESOME", title2:"FOR A BALANCED LIFESTYLE"},
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative px-5 my-1.5 overflow-hidden">
      {/* Slider container */}
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4">
            {/* Display images per row, wrapping in flex */}
            <div className="flex justify-evenly mb-5">
              <div className="w-80 mx-10">
                <img src={slide.image} alt={slide.title} className="w-full h-auto object-cover" />
                <h2 className="text-xl font-bold mt-3 text-white border-amber-800 bg-green-800 rounded-xl my-1 px-5 lg:absolute top-55 ">{slide.title}</h2>
                <h3 className="text-sm text-white border-amber-800 bg-amber-600 rounded-xl my-1 px-5 absolute top-65" >{slide.title2}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Left Navigation Button */}
      <button
        onClick={prevSlide} 
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-green-400 text-white p-2 rounded-full z-10"
      >
        &#8592;
      </button>

      {/* Right Navigation Button */}
      <button 
        onClick={nextSlide} 
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-green-400 text-white p-2 rounded-full z-10"
      >
        &#8594;
      </button>
    </div>
  );
};

export default Slider;
