// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ProgressionProvider } from './hooks/ProgressionContext.jsx'; // Correct path

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProgressionProvider>
      <App />
    </ProgressionProvider>
  </React.StrictMode>
);
