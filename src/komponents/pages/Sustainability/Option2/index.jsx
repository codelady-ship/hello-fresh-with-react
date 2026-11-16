import React from 'react';
import SustainabilityPage from '../SustainabilityPage';

const Option2 = () => (
  <SustainabilityPage
    title="Seasonal ingredients"
    intro="Cooking with the seasons means fresher food and more variety through the year."
    points={[
      { title: 'Fresher taste', text: 'Fruit and vegetables picked in season usually spend less time travelling before they reach your kitchen.' },
      { title: 'More variety', text: 'A menu that changes with the seasons keeps weekly cooking interesting.' },
      { title: 'Plant-forward options', text: 'Veggie recipes built around beans, grains and vegetables are an easy way to eat more plants.' },
    ]}
    tip="Swap one meat recipe a week for a veggie one and see which plant-based dishes your household likes."
  />
);

export default Option2;
