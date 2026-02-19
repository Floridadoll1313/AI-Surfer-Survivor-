import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Fixed the path to go into the double-src folder
import Lessons from './src/pages/Lessons'; 

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a192f] text-white">
        <header className="p-6 border-b border-cyan-900/50">
          <h1 className="text-2xl font-bold text-cyan-400 tracking-tighter">
            AI SURFER <span className="text-white">SURVIVOR</span>
          </h1>
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<Lessons />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
