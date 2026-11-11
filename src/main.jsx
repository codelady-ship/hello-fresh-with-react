
import { createRoot } from 'react-dom/client'
import './Styles.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  // basename = Vite base ("/" locally, "/hello-fresh-with-react/" on GitHub Pages)
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <App />
  </BrowserRouter>
)
