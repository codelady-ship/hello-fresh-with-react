import { createRoot } from 'react-dom/client';
import './Styles.css';
import App from './App.jsx';
import { HashRouter } from 'react-router-dom';

// HashRouter keeps every route on the same HTML file (e.g. /hello-fresh-with-react/#/OurPlans),
// so deep links and page refreshes work on GitHub Pages without 404s.
createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>
);
