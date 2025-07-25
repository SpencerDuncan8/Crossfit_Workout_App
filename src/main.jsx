// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AppProviders } from './context/AppContext.jsx';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
    <Analytics />
  </React.StrictMode>
);