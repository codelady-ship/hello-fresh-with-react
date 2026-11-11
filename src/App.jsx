import React from 'react';
import Header from './komponents/layout/Header';
import Footer from './komponents/layout/Footer';
import RouterPart from './komponents/RouterPart';

// Header and Footer on every page; RouterPart shows the home sections on "/" and the other pages on their routes.
const App = () => {
  return (
    <div>
      <Header />
      <RouterPart />
      <Footer />
    </div>
  );
}

export default App;
