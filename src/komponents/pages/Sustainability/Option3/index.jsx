import React from 'react';
import SustainabilityPage from '../SustainabilityPage';

const Option3 = () => (
  <SustainabilityPage
    title="Less food waste"
    intro="Small kitchen habits that help you throw away less food."
    points={[
      { title: 'Pre-portioned ingredients', text: 'When each recipe comes with the amount it needs, fewer half-used packs are left in the fridge.' },
      { title: 'Plan your week', text: 'Cook the recipes with the most delicate ingredients, like fish and fresh herbs, first.' },
      { title: 'Love your leftovers', text: 'Extra rice, roasted vegetables or sauce make a quick lunch the next day.' },
    ]}
    tip="Keep a short list on the fridge of what needs to be used up first."
  />
);

export default Option3;
