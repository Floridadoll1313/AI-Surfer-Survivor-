import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- PAGE IMPORTS ---
import Home from './pages/Home';
import Members from './pages/Members';
import Success from './pages/Success';
import Inventory from './pages/Inventory';
import SurvivorWorld from './pages/SurvivorWorld';

// --- COMPONENT IMPORTS ---
import ProtectedRoute from './components/ProtectedRoute';

// --- CONTEXT PROVIDERS ---
import { AvatarProvider } from './context/AvatarContext';

function App() {
  return (
    <AvatarProvider>
      <Router>
        <div style={{ minHeight: '100vh', backgroundColor: '#0a192f' }}>
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/members" element={<Members />} />
            <Route path="/success" element={<Success />} />

            {/* PROTECTED ROUTES (Requires Membership) */}
            <Route 
              path="/survivor" 
              element={
                <ProtectedRoute>
                  <SurvivorWorld />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/inventory" 
              element={
                <ProtectedRoute>
                  <Inventory />
                </ProtectedRoute>
              } 
            />

            {/* FALLBACK: Redirect any unknown routes to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </AvatarProvider>
  );
}

export default App;
