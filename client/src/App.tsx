import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AvatarProvider } from './context/AvatarContext';
import AvatarSelector from './pages/AvatarSelector';
import Header from './components/Header';

function App() {
  return (
    <AvatarProvider>
      <Router>
        <div style={{ 
          minHeight: '100vh', 
          backgroundColor: '#0a192f',
          color: '#ffffff' 
        }}>
          <Header />
          <main style={{ padding: '20px' }}>
            <Routes>
              {/* This makes the Avatar Selector the home page for now */}
              <Route path="/" element={<AvatarSelector />} />
              <Route path="/avatar" element={<AvatarSelector />} />
              
              {/* Future routes like /game or /profile will go here */}
            </Routes>
          </main>
        </div>
      </Router>
    </AvatarProvider>
  );
}

export default App;
