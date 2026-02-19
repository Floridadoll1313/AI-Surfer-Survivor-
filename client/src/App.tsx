import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Lessons from './pages/Lessons'; 
import MemberSection from './pages/MemberSection';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a192f] text-white">
        {/* --- GLOBAL LOGO HEADER --- */}
        <header className="sticky top-0 z-50 w-full border-b border-cyan-500/20 bg-[#0a192f]/80 backdrop-blur-md">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:scale-110 transition-transform">
                <span className="text-2xl">🌊</span>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tighter text-white">
                  AI SURFER <span className="text-cyan-400 text-sm block -mt-1 uppercase tracking-widest">Survivor</span>
                </h1>
              </div>
            </Link>
            
            <nav className="flex gap-8 text-sm font-medium">
              <Link to="/lessons" className="text-gray-400 hover:text-cyan-400 transition-colors">TRAINING</Link>
              <Link to="/members" className="text-cyan-400 hover:text-white transition-colors flex items-center gap-1">
                <span>⭐</span> MEMBERS
              </Link>
            </nav>
          </div>
        </header>

        {/* --- PAGE CONTENT --- */}
        <main className="container mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Lessons />} />
            <Route path="/lessons" element={<Lessons />} />
            {/* This is your new route! */}
            <Route path="/members" element={<MemberSection />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
