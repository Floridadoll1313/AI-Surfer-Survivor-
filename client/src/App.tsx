import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AvatarProvider } from './context/AvatarContext';
import AvatarSelector from './pages/AvatarSelector';
import Home from './pages/Home';
import SurvivorWorld from './pages/SurvivorWorld';
import Header from './components/Header';

function App() {
  return (
    <AvatarProvider>
      <Router>
        <div style={{ 
          minHeight: '100vh', 
          backgroundColor: '#0a192f',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Header />
          <main style={{ flex: 1 }}>
            <Routes>
              {/* Home page shows the user's status */}
              <Route path="/" element={<Home />} />
              
              {/* Avatar page lets them change identity */}
              <Route path="/avatar" element={<AvatarSelector />} />
              
              {/* The Game World Grid */}
              <Route path="/game" element={<SurvivorWorld />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AvatarProvider>
  );
}

export default App;
