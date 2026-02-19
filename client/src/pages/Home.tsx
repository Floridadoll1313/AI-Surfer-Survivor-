import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    wallet: 0,
    highScore: 0,
    isMember: false
  });

  useEffect(() => {
    setStats({
      wallet: Number(localStorage.getItem('survivor_wallet')) || 0,
      highScore: Number(localStorage.getItem('survivor_high_score')) || 0,
      isMember: localStorage.getItem('membership_active') === 'true'
    });
  }, []);

  const handleDeactivate = () => {
    localStorage.removeItem('membership_active');
    setStats(prev => ({ ...prev, isMember: false }));
    alert('PROTOCOL_TERMINATED: Elite access revoked.');
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'monospace', color: '#64ffda' }}>
      <header style={{ marginBottom: '40px', borderBottom: '1px solid #112240', paddingBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>&gt; MISSION_CONTROL</h1>
          <p style={{ color: '#8892b0', margin: 0 }}>System Status: <span style={{ color: stats.isMember ? '#64ffda' : '#ff5f5f' }}>{stats.isMember ? 'ONLINE' : 'RESTRICTED'}</span></p>
        </div>
        <button 
          onClick={() => navigate('/inventory')}
          style={{ background: '#112240', border: '1px solid #35c9ff', color: '#35c9ff', padding: '10px 20px', cursor: 'pointer' }}
        >
          VIEW_GEAR
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div style={{ border: '1px solid #35c9ff', padding: '25px', background: 'rgba(17, 34, 64, 0.5)' }}>
          <h3 style={{ color: '#35c9ff' }}>[01] DATA_VAULT</h3>
          <div style={{ marginTop: '20px' }}>
            <p style={{ color: '#8892b0' }}>TOTAL_XP: <span style={{ color: '#fff' }}>{stats.wallet}</span></p>
            <p style={{ color: '#8892b0' }}>PEAK_SYNC: <span style={{ color: '#fff' }}>{stats.highScore}</span></p>
          </div>
        </div>

        <div style={{ border: '1px solid #64ffda', padding: '25px', background: 'rgba(10, 25, 47, 0.8)' }}>
          <h3>[02] NEURAL_LINK</h3>
          <p style={{ color: '#8892b0', margin: '15px 0' }}>{stats.isMember ? 'Access to Survivor World is live.' : 'Membership required to enter the void.'}</p>
          <button 
            onClick={() => navigate('/survivor')}
            style={{ width: '100%', padding: '15px', background: stats.isMember ? '#64ffda' : '#0a192f', color: stats.isMember ? '#0a192f' : '#35c9ff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {stats.isMember ? 'LAUNCH_SIMULATION' : 'UPGRADE_REQUIRED'}
          </button>
        </div>

        <div style={{ border: '1px solid #4e566d', padding: '25px', background: 'rgba(10, 25, 47, 0.9)' }}>
          <h3 style={{ color: '#8892b0' }}>[03] SETTINGS</h3>
          <div style={{ marginTop: '20px' }}>
            {stats.isMember ? (
              <button onClick={handleDeactivate} style={{ width: '100%', padding: '10px', background: 'none', border: '1px solid #ff5f5f', color: '#ff5f5f', cursor: 'pointer' }}>CANCEL_ELITE_ACCESS</button>
            ) : (
              <button onClick={() => navigate('/members')} style={{ width: '100%', padding: '10px', background: '#64ffda', color: '#0a192f', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>GET_PRO_LICENSE</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
