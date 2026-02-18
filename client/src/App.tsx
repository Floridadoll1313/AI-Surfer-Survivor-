import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import Challenges from './pages/challenges';
import SurvivorWorld from './pages/survivorworld';

export default function App() {
  return (
    <Router>
      <nav style={{
        display: 'flex',
        gap: '20px',
        padding: '20px',
        backgroundColor: '#001f3f',
        color: '#e0f7ff',
        fontFamily: 'Inter, sans-serif',
      }}>
        <Link to="/" style={{ color: '#4ecbff', textDecoration: 'none' }}>Home</Link>
        <Link to="/challenges" style={{ color: '#4ecbff', textDecoration: 'none' }}>Challenges</Link>
        <Link to="/world" style={{ color: '#4ecbff', textDecoration: 'none' }}>Survivor World</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/world" element={<SurvivorWorld />} />
      </Routes>
    </Router>
  );
}
