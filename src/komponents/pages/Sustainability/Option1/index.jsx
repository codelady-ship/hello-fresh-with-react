import React from 'react';
import SustainabilityPage from '../SustainabilityPage';

const Option1 = () => (
  <SustainabilityPage
    title="Packaging & recycling"
    intro="How to sort the box, the bags and the cooling packs after a delivery."
    points={[
      { title: 'Cardboard box', text: 'Flatten the box and put it in paper recycling. Remove any tape first if your local rules ask for it.' },
      { title: 'Ingredient bags', text: 'Check the label on each bag. Soft plastics often go to store drop-off points instead of the home bin.' },
      { title: 'Ice packs', text: 'Let the gel pack thaw, empty the gel into the bin (never down the drain) and recycle the film if you can.' },
    ]}
    tip="Recycling rules differ from city to city, so check your local council's guide."
  />
);

export default Option1;
