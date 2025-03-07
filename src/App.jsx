import React from 'react';
import Header from './komponents/layout/Header';  
import PagesP1 from '../../layout/PagesPart1/index1.js';  
import PagesP2 from 'PagesPart1/index2';
import PagesP3 from 'PagesPart1/index3';
import PagesP4 from 'PagesPart1/index4';
import PagesP5 from 'PagesPart1/index5';
import PagesP6 from 'PagesPart1/index6';
import PagesP7 from 'PagesPart1/index7';
import Footer from 'komponents/layout/Footer'; 
import RouterPart from './komponents/RouterPart'; 

const App = () => {
  return (
    <div>
      <Header />
      <RouterPart />
      <PagesP1 />
      <PagesP2 />
      <PagesP3 />
      <PagesP4 />
      <PagesP5 />
      <PagesP6 />
      <PagesP7 />
      <Footer />
    </div>
  );
}

export default App;
