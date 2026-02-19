import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Page Imports
import Home from './pages/Home';
import Members from './pages/Members';
import Lessons from './pages/Lessons'; 
import Profile from './pages/Profile';
import SurvivorWorld from './pages/SurvivorWorld';
import Achievements from './pages/Achievements';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#0a192f]">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            
            {/* We removed ProtectedRoute from Lessons so you can actually see it! */}
            <Route path="/lessons" element={<Lessons />} />

            {/* Protected Member Routes */}
            <Route path="/members" element={
              <ProtectedRoute>
                <Members />
              </ProtectedRoute>
            } />

            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            <Route path="/world" element={
              <ProtectedRoute>
                <SurvivorWorld />
              </ProtectedRoute>
            } />

            <Route path="/achievements" element={
              <ProtectedRoute>
                <Achievements />
              </ProtectedRoute>
            } />

            <Route path="/leaderboard" element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
