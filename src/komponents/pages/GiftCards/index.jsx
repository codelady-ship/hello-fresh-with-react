import React from "react";
import Header from "../../layout/Header"; // Corrected relative path
import Footer from "../../layout/Footer"; // Correct relative path for Footer as well


const GiftCards = () => {
  return (
    <div>
      <Header />
      <h2 className="text-gray-700 lg:text-4xl mt-10 mb-2"
      >About Gift Cards</h2>
      <Footer />
    </div>
  );
};

export default GiftCards;
