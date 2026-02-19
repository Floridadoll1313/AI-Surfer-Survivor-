import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// --- HIGH CONTRAST PAGE TEMPLATES ---

const Home = () => (
  <div style={{ textAlign: 'center', padding: '60px 20px' }}>
    <h1 style={{ fontSize: '3.5rem', color: '#ffffff', marginBottom: '20px' }}>OCEAN TIDE DROP</h1>
    <p style={{ fontSize: '1.2rem', color: '#b0c4de', maxWidth: '600px', margin: '0 auto' }}>
      The AI Surfer Survivor Arena is initializing. Prepare to navigate the digital currents.
    </p>
  </div>
);

const Island = () => (
  <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
    <h1 style={{ color: '#35c9ff', fontSize: '2.5rem' }}>SURVIVOR ISLAND</h1>
    <p style={{ color: '#ffffff', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '30px' }}>
      Welcome to the Maritime Hub. Below is your tactical map of the Never Ending Realm.
    </p>
    <div style={{ border: '2px solid #35c9ff', padding: '15px', borderRadius: '12px', background: '#0a192f' }}>
      <img 
        src="https://otdaisurfer.surf/AI%20Surfer%20Survivor%20Island%20Map.png" 
        alt="Island Map" 
        style={{ width: '100%', borderRadius: '8px', display: 'block' }} 
      />
    </div>
  </div>
);

const Challenges = () => (
  <div style={{ maxWidth: '800px', margin: '0 auto' }}>
    <h1 style={{ color: '#ff9f40', fontSize: '2.5rem' }}>ACTIVE CHALLENGES</h1>
    <p style={{ color: '#ffffff', marginBottom: '30px' }}>Complete trials to synchronize your biometrics.</p>
    
    <div style={{ 
      background: '#101a30', 
      padding: '30px', 
      borderRadius: '12px', 
      borderLeft: '6px solid #ff9f40',
      marginBottom: '20px' 
    }}>
      <h3 style={{ color: '#ffffff', fontSize: '1.5rem', marginTop: '0' }}>Trial 01: The Sailing Ship</h3>
      <p style={{ color: '#d1d1d1', fontSize: '1.1rem' }}>
        Navigate the wooden walkways and rope bridges. Maintain balance within the digital tide to prevent desync.
      </p>
      <button style={{
        marginTop: '15px',
        padding: '10px 20px',
        background: 'transparent',
        border: '1px solid #ff9f40',
        color: '#ff9f40',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}>BEGIN INITIALIZATION</button>
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
