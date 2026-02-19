import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    wallet: 0,
    highScore: 0,
    isMember: false,
    dailyFragments: 0,
    missionClaimed: false,
    leaderboard: [] as number[]
  });

  useEffect(() => {
    // Basic Stats
    const wallet = Number(localStorage.getItem('survivor_wallet')) || 0;
    const highScore = Number(localStorage.getItem('survivor_high_score')) || 0;
    const isMember = localStorage.getItem('membership_active') === 'true';
    
    // Leaderboard Logic
    const rawLeaderboard = localStorage.getItem('survivor_leaderboard');
    const leaderboard = rawLeaderboard ? JSON.parse(rawLeaderboard) : [];

    // Daily Mission Logic
    const today = new Date().toDateString();
    const lastReset = localStorage.getItem('mission_last_reset');
    let dailyFrags = Number(localStorage.getItem('daily_fragments')) || 0;
    let claimed = localStorage.getItem('mission_claimed') === 'true';

    if (lastReset !== today) {
      dailyFrags = 0;
      claimed = false;
      localStorage.setItem('mission_last_reset', today);
      localStorage.setItem('daily_fragments', '0');
      localStorage.setItem('mission_claimed', 'false');
    }

    setStats({ wallet, highScore, isMember, dailyFragments: dailyFrags, missionClaimed: claimed, leaderboard });
  }, []);

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'monospace', color: '#64ffda' }}>
      <header style={{ marginBottom: '40px', borderBottom: '1px solid #112240', paddingBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>&gt; MISSION_CONTROL</h1>
          <p style={{ color: '#8892b0', margin: 0 }}>Status: <span style={{ color: stats.isMember ? '#64ffda' : '#ff5f5f' }}>{stats.isMember ? 'ONLINE' : 'RESTRICTED'}</span></p>
        </div>
        <button onClick={() => navigate('/inventory')} style={{ background: '#112240', border: '1px solid #35c9ff', color: '#35c9ff', padding: '10px 20px', cursor: 'pointer' }}>VIEW_GEAR</button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        
        {/* LEFT COLUMN: MISSIONS & ACCESS */}
        <div>
          <div style={{ marginBottom: '30px', padding: '25px', border: '1px solid #64ffda', background: 'rgba(100, 255, 218, 0.05)' }}>
            <h3 style={{ margin: '0 0 15px 0' }}>[ DAILY_OBJECTIVE ]</h3>
            <p>Extract 50 Fragments: {stats.dailyFragments}/50</p>
            <button 
                disabled={stats.dailyFragments < 50 || stats.missionClaimed}
                style={{ marginTop: '10px', padding: '10px', width: '100%', background: stats.dailyFragments >= 50 && !stats.missionClaimed ? '#64ffda' : '#112240' }}
            >
                {stats.missionClaimed ? 'CLAIMED' : 'CLAIM_500_XP'}
            </button>
          </div>

          <div style={{ border: '1px solid #35c9ff', padding: '25px', background: 'rgba(17, 34, 64, 0.5)' }}>
            <h3 style={{ color: '#35c9ff' }}>[ NEURAL_LINK ]</h3>
            <button 
              onClick={() => navigate('/survivor')}
              style={{ width: '100%', padding: '20px', marginTop: '10px', background: stats.isMember ? '#64ffda' : '#112240', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {stats.isMember ? 'LAUNCH_SIMULATION' : 'UPGRADE_REQUIRED'}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: HALL OF FAME */}
        <div style={{ border: '1px solid #8892b0', padding: '20px', background: 'rgba(10, 25, 47, 0.9)' }}>
          <h3 style={{ color: '#8892b0', textAlign: 'center', borderBottom: '1px solid #4e566d', paddingBottom: '10px' }}>HALL_OF_FAME</h3>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
            {stats.leaderboard.length > 0 ? stats.leaderboard.map((score, i) => (
              <li key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #112240' }}>
                <span style={{ color: i === 0 ? '#ffcc00' : '#8892b0' }}>0{i+1}_SURFER</span>
                <span style={{ color: '#fff' }}>{score}</span>
              </li>
            )) : <li style={{ color: '#4e566d', textAlign: 'center' }}>NO_DATA_FOUND</li>}
          </ul>
          <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '0.8rem', color: '#4e566d' }}>
            YOUR_BEST: {stats.highScore}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
