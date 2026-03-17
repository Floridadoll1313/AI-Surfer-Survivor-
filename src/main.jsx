// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Global Systems
import { ProgressionProvider } from './hooks/ProgressionContext.jsx';

// Vercel Analytics
import { Analytics } from '@vercel/analytics/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProgressionProvider>
      <App />
      <Analytics />
    </ProgressionProvider>
  </React.StrictMode>
);
