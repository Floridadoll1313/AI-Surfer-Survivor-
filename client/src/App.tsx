import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useOutletContext } from 'react-router-dom';
import Layout from './components/Layout';

// --- PAGE COMPONENTS ---

const Home = () => {
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPass(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const logs = [
    { id: 1, date: "2026.02.19", msg: "Sector Alpha synchronization stable." },
    { id: 2, date: "2026.02.18", msg: "Pulse Animation module integrated." },
    { id: 3, date: "2026.02.15", msg: "Warning: Digital tide levels rising." }
  ];

  return (
    <div style={{ padding: '40px 20px' }}>
      {showPass && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 2000,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{
            background: '#0a192f', padding: '40px', borderRadius: '20px',
            border: '2px solid #35c9ff', maxWidth: '500px', textAlign: 'center'
          }}>
            <h2 style={{ color: '#35c9ff', fontSize: '2rem' }}>FOUNDER'S PASS</h2>
            <p style={{ color: '#ffffff', marginBottom: '25px' }}>Access to the Realm is granted.</p>
            <button 
              onClick={() => setShowPass(false)} 
              style={{ background: '#35c9ff', color: '#020817', border: 'none', padding: '12px 30px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Accept Credentials
            </button>
          </div>
        </div>
      )}

      <h1 style={{ textAlign: 'center', fontSize: '3.5rem', color: '#ffffff', textShadow: '0 0 20px #35c9ff' }}>
        OCEAN TIDE DROP
      </h1>
      
      <div style={{ maxWidth: '700px', margin: '40px auto' }}>
        <h2 style={{ color: '#ffffff', borderBottom: '1px solid #35c9ff', paddingBottom: '10px' }}>SURVIVAL LOGS</h2>
        {logs.map(log => (
          <div key={log.id} style={{ background: 'rgba(53, 201, 255, 0.05)', padding: '15px', marginBottom: '10px', borderLeft: '3px solid #35c9ff', color: '#ffffff' }}>
            <span style={{ color: '#35c9ff', fontWeight: 'bold' }}>[{log.date}]</span> {log.msg}
          </div>
        ))}
      </div>
    </div>
  );
};

const Equipment = () => {
  const { setProgress } = useOutletContext<{ setProgress: React.Dispatch<React.SetStateAction<number>> }>();

  const items = [
    { id: 'bio_link', name: "Biometric Link", desc: "Syncs your pulse to the Realm.", rarity: "Essential", boost: 25 },
    { id: 'dig_comp', name: "Digital Compass", desc: "Points toward stable nodes.", rarity: "Common", boost: 15 },
    { id: 'neu_over', name: "Neural Overdrive", desc: "Instantly boosts sync levels.", rarity: "Rare", boost: 50 }
  ];

  const collectItem = (boost: number) => {
    setProgress(prev => {
      const nextValue = Math.min(prev + boost, 100);
      localStorage.setItem('survivor_progress', nextValue.toString());
      return nextValue;
    });
  };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ color: '#35c9ff', fontSize: '2.5rem' }}>SURVIVAL GEAR</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
        {items.map((item) => (
          <div key={item.id} style={{ background: '#112240', padding: '25px', borderRadius: '12px', border: '1px solid #35c9ff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ color: '#35c9ff', margin: '0 0 10px 0' }}>{item.name}</h3>
              <p style={{ color: '#8892b0', fontSize: '0.9rem' }}>{item.desc}</p>
              <span style={{ fontSize: '0.75rem', color: '#64ffda', textTransform: 'uppercase' }}>{item.rarity}</span>
            </div>
            <button 
              onClick={() => collectItem(item.boost)}
              style={{ marginTop: '20px', background: 'transparent', border: '1px solid #35c9ff', color: '#35c9ff', padding: '10px', cursor: 'pointer', borderRadius: '4px' }}
            >
              Equip (+{item.boost}%)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const MapPage = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: Math.floor(e.clientX - bounds.left),
      y: Math.floor(e.clientY - bounds.top)
    });
  };

  return (
    <div style={{ padding: '40px', color: '#ffffff', display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
      <div style={{ flex: '1', minWidth: '400px', maxWidth: '800px' }}>
        <h1 style={{ color: '#35c9ff' }}>REALM NAVIGATION</h1>
        <div onMouseMove={handleMouseMove} style={{ position: 'relative', border: '2px solid #35c9ff', borderRadius: '15px', overflow: 'hidden', cursor: 'crosshair' }}>
          <img src="/AI Surfer Survivor Island Map.png" alt="Island Map" style={{ width: '100%', filter: 'brightness(0.7)' }} />
          <div style={{ position: 'absolute', bottom: '15px', right: '15px', background: 'rgba(10, 25, 47, 0.9)', padding: '8px 15px', borderRadius: '5px', border: '1px solid #35c9ff', color: '#64ffda', fontFamily: 'monospace' }}>
            LAT: {coords.y} // LONG: {coords
