import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    wallet: 0,
    highScore: 0,
    isMember: false,
    dailyFragments: 0,
    missionClaimed: false
  });

  useEffect(() => {
    // Load Core Stats
    const wallet = Number(localStorage.getItem('survivor_wallet')) || 0;
    const highScore = Number(localStorage.getItem('survivor_high_score')) || 0;
    const isMember = localStorage.getItem('membership_active') === 'true';

    // Daily Mission Logic (Reset if it's a new day)
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem('mission_date');
    let dailyFragments = Number(localStorage.getItem('daily_fragments')) || 0;
    let missionClaimed = localStorage.getItem('mission_claimed') === 'true';

    if (lastDate !== today) {
      dailyFragments = 0;
      missionClaimed = false;
      localStorage.setItem('mission_date', today);
      localStorage.setItem('daily_fragments', '0');
      localStorage.setItem('mission_claimed', 'false');
    }

    setStats({ wallet, highScore, isMember, dailyFragments, missionClaimed });
  }, []);

  const claimMission = () => {
    if (stats.dailyFragments >= 50 && !stats.missionClaimed) {
      const newWallet = stats.wallet + 500;
      localStorage.setItem('survivor_wallet', newWallet.toString());
      localStorage.setItem('mission_claimed', 'true');
      setStats(prev => ({ ...prev, wallet: newWallet, missionClaimed: true }));
      alert('MISSION_COMPLETE: +500 XP SECURED');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'monospace', color: '#64ffda' }}>
      <header style={{ marginBottom: '40px', borderBottom: '1px solid #112240', paddingBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>&gt; MISSION_CONTROL</h1>
          <p style={{ color: '#8892b0', margin: 0 }}>System Status: <span style={{ color: stats.isMember ? '#64ffda' : '#ff5f5f' }}>{stats.isMember ? 'ONLINE' : 'RESTRICTED'}</span></p>
        </div>
        <button onClick={() => navigate('/inventory')} style={{ background: '#112240', border: '1px solid #35c9ff', color: '#35c9ff', padding: '10px 20px', cursor: 'pointer' }}>VIEW_GEAR</button>
      </header>

      {/* DAILY MISSIONS PANEL */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #64ffda', background: 'rgba(100, 255, 218, 0.05)' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>DAILY_OBJECTIVE</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ margin: 0 }}>Collect 50 Fragments in 24h</p>
            <p style={{ fontSize: '0.8rem', color: '#8892b0' }}>Progress: {stats.dailyFragments} / 50</p>
          </div>
          <button 
            disabled={stats.dailyFragments < 50 || stats.missionClaimed}
            onClick={claimMission}
            style={{
              padding: '10px 20px',
              background: (stats.dailyFragments >= 50 && !stats.missionClaimed) ? '#64ffda' : '#112240',
              color: (stats.dailyFragments >= 50 && !stats.missionClaimed) ? '#0a192f' : '#4e566d',
              border: 'none', fontWeight: 'bold', cursor: 'pointer'
            }}
          >
            {stats.missionClaimed ? 'CLAIMED' : 'CLAIM +500 XP'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div style={{ border: '1px solid #35c9ff', padding: '25px', background: 'rgba(17, 34, 64, 0.5)' }}>
          <h3 style={{ color: '#35c9ff' }}>[01] DATA_VAULT</h3>
          <p style={{ color: '#8892b0' }}>TOTAL_XP: <span style={{ color: '#fff' }}>{stats.wallet}</span></p>
          <p style={{ color: '#8892b0' }}>PEAK_SYNC: <span style={{ color: '#fff' }}>{stats.highScore}</span></p>
        </div>

        <div style={{ border: '1px solid #64ffda', padding: '25px', background: 'rgba(10, 25, 47, 0.8)' }}>
          <h3>[02] NEURAL_LINK</h3>
          <button 
            onClick={() => navigate('/survivor')}
            style={{ width: '100%', padding: '15px', background: stats.isMember ? '#64ffda' : '#112240', color: stats.isMember ? '#0a192f' : '#35c9ff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {stats.isMember ? 'LAUNCH_SIMULATION' : 'UPGRADE_REQUIRED'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
