import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './komponents/layout/Header';
import Footer from './komponents/layout/Footer';
import RouterPart from './komponents/RouterPart';
import Admin from './komponents/pages/Admin';

// Header and Footer on every page; RouterPart shows the home sections on "/" and the other pages on their routes.
// The admin page (#/admin) has its own layout, so it is routed outside the site header and footer.
const Site = () => (
  <div>
    <Header />
    <RouterPart />
    <Footer />
  </div>
);

const App = () => (
  <Routes>
    <Route path="/admin/*" element={<Admin />} />
    <Route path="*" element={<Site />} />
  </Routes>
);

export default App;
