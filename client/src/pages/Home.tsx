import React from 'react';
import { Link } from 'react-router-dom';
import { useAvatar } from '../context/AvatarContext';

const Home = () => {
  const { selectedAvatar } = useAvatar();

  const avatarData: Record<string, { icon: string; label: string; description: string }> = {
    ghost: { icon: '◈', label: 'NEURAL_GHOST', description: 'Invisibility within the data streams. Stealth-optimized.' },
    runner: { icon: '❖', label: 'TIDE_RUNNER', description: 'High-velocity traversal across the digital surf.' },
    void: { icon: '⬢', label: 'VOID_WALKER', description: 'Stable existence within non-space. Entropy resistant.' },
    surfer: { icon: '🌀', label: 'AI_SURFER', description: 'The original architect of the wave. Balanced performance.' }
  };

  const current = avatarData[selectedAvatar] || avatarData.ghost;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px', fontFamily: 'monospace' }}>
      <section style={{ 
        border: '1px solid #35c9ff', 
        padding: '40px', 
        borderRadius: '8px', 
        background: 'rgba(17, 34, 64, 0.5)',
        textAlign: 'center' 
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px', textShadow: '0 0 20px #64ffda' }}>
          {current.icon}
        </div>
        <h1 style={{ color: '#64ffda', letterSpacing: '4px' }}>WELCOME, {current.label}</h1>
        <p style={{ color: '#8892b0', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 30px' }}>
          {current.description}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Link to="/game" style={{
            padding: '12px 30px',
            backgroundColor: '#35c9ff',
            color: '#0a192f',
            textDecoration: 'none',
            fontWeight: 'bold',
            borderRadius: '4px'
          }}>
            ENTER_THE_GRID
          </Link>
          <Link to="/avatar" style={{
            padding: '12px 30px',
            border: '1px solid #35c9ff',
            color: '#35c9ff',
            textDecoration: 'none',
            borderRadius: '4px'
          }}>
            RE_ENCRYPT_ID
          </Link>
        </div>
      </section>

      <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ border: '1px solid rgba(136, 146, 176, 0.3)', padding: '20px', borderRadius: '4px' }}>
          <h3 style={{ color: '#35c9ff' }}>SYSTEM_STATUS</h3>
          <p style={{ color: '#8892b0', fontSize: '0.9rem' }}>Power: STABLE</p>
          <p style={{ color: '#8892b0', fontSize: '0.9rem' }}>Network: ENCRYPTED</p>
        </div>
        <div style={{ border: '1px solid rgba(136, 146, 176, 0.3)', padding: '20px', borderRadius: '4px' }}>
          <h3 style={{ color: '#35c9ff' }}>MISSION_LOG</h3>
          <p style={{ color: '#8892b0', fontSize: '0.9rem' }}>No active signals detected...</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
