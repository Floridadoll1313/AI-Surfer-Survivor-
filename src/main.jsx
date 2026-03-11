import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// If your hook is a .js file, use .js; if it's .jsx, use .jsx
import { ProgressionProvider } from './source/hooks/ProgressionContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProgressionProvider>
      <App />
    </ProgressionProvider>
  </React.StrictMode>,
);
