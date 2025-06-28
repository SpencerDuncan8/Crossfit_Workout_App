// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AppProviders } from './context/AppContext.jsx';
import { Analytics } from '@vercel/analytics/react'; // <-- CORRECT IMPORT FOR REACT
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
    <Analytics /> {/* <-- ADD THE COMPONENT HERE */}
  </React.StrictMode>
);