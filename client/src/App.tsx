import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// --- EASY TO READ PAGE TEMPLATES ---

const Home = () => (
  <div style={{ textAlign: 'center', padding: '50px' }}>
    <h1 style={{ fontSize: '3rem', color: '#ffffff' }}>OCEAN TIDE DROP</h1>
    <p style={{ fontSize: '1.2rem', color: '#b0c4de' }}>The AI Surfer Survivor Arena is initializing...</p>
  </div>
);

const Island = () => (
  <div style={{ maxWidth: '900px', margin: '0 auto' }}>
    <h1 style={{ color: '#35c9ff' }}>SURVIVOR ISLAND</h1>
    <p style={{ color: '#ffffff', lineHeight: '1.6' }}>
      Welcome to the Maritime Hub. Below is your current tactical map of the Never Ending Realm.
    </p>
    <div style={{ border: '2px solid #35c9ff', padding: '10px', borderRadius: '10px', marginTop: '20px' }}>
      <img 
        src="https://otdaisurfer.surf/AI%20Surfer%20Survivor%20Island%20Map.png" 
        alt="Island Map" 
        style={{ width: '100%', borderRadius: '5px' }} 
      />
    </div>
  </div>
);

const Challenges = () => (
  <div style={{ maxWidth: '800px', margin: '0 auto' }}>
    <h1 style={{ color: '#ff9f40' }}>ACTIVE CHALLENGES</h1>
    <div style={{ background: '#101a30', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #ff9f40' }}>
      <h3 style={{ color: '#ffffff' }}>Trial 01: The Sailing Ship</h3>
      <p style={{ color: '#d1d1d1' }}>Navigate the wooden walkways and rope bridges. Don't fall into the digital tide.</p>
    </div>
  </div>
);

// --- MAIN ROUTING ---

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="world" element={<Island />} />
          <Route path="challenges" element={<Challenges />} />
        </Route>
      </Routes>
    </Router>
  );
}
