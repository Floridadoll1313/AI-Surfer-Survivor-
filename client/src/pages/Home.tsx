import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    setIsMember(localStorage.getItem('membership_active') === 'true');
  }, []);

  const handleDeactivate = () => {
    localStorage.removeItem('membership_active');
    setIsMember(false);
    alert('ACCESS_REVOKED: Session terminated.');
  };

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', fontFamily: 'monospace', color: '#64ffda' }}>
      <header style={{ marginBottom: '50px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', textShadow: '0 0 10px #64ffda' }}>AI_SURFER_SURVIVOR</h1>
        <p style={{ color: '#8892b0' }}>V.2.06 // GLOBAL_ANOMALY_PROTOCOL</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ border: '1px solid #35c9ff', padding: '20px', background: 'rgba(17, 34, 64, 0.8)' }}>
          <h2 style={{ color: '#35c9ff' }}>&gt; GAME_CLIENT</h2>
          <p>Status: {isMember ? 'AUTHORIZED' : 'LOCKED'}</p>
          <button 
            onClick={() => navigate('/survivor')}
            style={{ width: '100%', padding: '15px', marginTop: '20px', background: isMember ? '#64ffda' : '#112240', color: isMember ? '#0a192f' : '#35c9ff', cursor: 'pointer' }}
          >
            {isMember ? 'LAUNCH_GAME' : 'UPGRADE_REQUIRED'}
          </button>
        </div>

        <div style={{ border: '1px solid #8892b0', padding: '20px', background: 'rgba(10, 25, 47, 0.9)' }}>
          <h2>&gt; ACCOUNT_CTRL</h2>
          {isMember ? (
            <button onClick={handleDeactivate} style={{ width: '100%', padding: '10px', marginTop: '20px', background: 'none', border: '1px solid #ff5f5f', color: '#ff5f5f' }}>CANCEL_MEMBERSHIP</button>
          ) : (
            <button onClick={() => navigate('/members')} style={{ width: '100%', padding: '10px', marginTop: '20px', background: 'none', border: '1px solid #64ffda', color: '#64ffda' }}>GET_PRO_ACCESS</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
