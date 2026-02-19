import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Lessons from './pages/Lessons';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a192f]">
        <Routes>
          {/* This sends everyone straight to your Lessons page */}
          <Route path="/" element={<Lessons />} />
          <Route path="/lessons" element={<Lessons />} />
          {/* Redirect any other page back to lessons */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
