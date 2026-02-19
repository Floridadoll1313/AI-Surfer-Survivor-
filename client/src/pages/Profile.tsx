import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  
  // --- PLAYER DATA ---
  const [stats, setStats] = useState({
    wallet: Number(localStorage.getItem('survivor_wallet')) || 0,
    unlockedMedals: JSON.parse(localStorage.getItem('achievements_unlocked') || '[]').length,
    highScore: JSON.parse(localStorage.getItem('survivor_leaderboard') || '[0]')[0],
    favAvatar: localStorage.getItem('favorite_avatar') || 'runner',
    totalRuns: Number(localStorage.getItem('total_runs_completed')) || 0
  });

  // Calculate Rank Title
  const getRank = (xp: number) => {
    if (xp >= 50000) return { title: 'SYSTEM_ARCHITECT', color: '#ff00ff' };
    if (xp >= 25000) return { title: 'ELITE_SURFER', color: '#35c9ff' };
    if (xp >= 10000) return { title: 'CORE_OPERATIVE', color: '#64ffda' };
    return { title: 'NOVICE_NODE', color: '#8892b0' };
  };

  const rankInfo = getRank(stats.wallet);

  // --- WIPE LOGIC ---
  const handleReset = () => {
    localStorage.clear(); // Wipes everything
    window.location.reload(); // Refresh to show 0s
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'monospace', color: '#64ffda', backgroundColor: '#0a192f', minHeight: '100vh' }}>
      <header style={{ borderBottom: '1px solid #112240', paddingBottom: '20px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.8rem' }}>&gt; USER_PROFILE_DIAGNOSTIC</h1>
          <p style={{ color: rankInfo.color, fontWeight: 'bold', letterSpacing: '2px' }}>RANK: {rankInfo.title}</p>
        </div>
        <button 
          onClick={() => navigate('/')} 
          style={{ background: 'none', border: '1px solid #64ffda', color: '#64ffda', padding: '10px 20px', cursor: 'pointer', height: 'fit-content' }}
        >
          RETURN_TO_HUB
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        
        {/* STATS PANEL */}
        <section style={{ background: '#112240', padding: '25px', borderLeft: `4px solid ${rankInfo.color}` }}>
          <h3 style={{ marginTop: 0, color: '#8892b0', fontSize: '0.9rem' }}>LIFETIME_METRICS</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#4e566d' }}>TOTAL_XP_ACCUMULATED</div>
              <div style={{ fontSize: '1.4rem' }}>{stats.wallet.toLocaleString()}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#4e566d' }}>PERSONAL_BEST_SCORE</div>
              <div style={{ fontSize: '1.4rem' }}>{stats.highScore.toLocaleString()}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#4e566d' }}>MISSIONS_COMPLETED</div>
              <div style={{ fontSize: '1.4rem' }}>{stats.totalRuns}</div>
            </div>
          </div>
        </section>

        {/* PROGRESS PANEL */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: '#112240', padding: '20px' }}>
            <h3 style={{ marginTop: 0, color: '#8892b0', fontSize: '0.9rem' }}>ACHIEVEMENT_SYNC</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' }}>
              <div style={{ flexGrow: 1, height: '8px', background: '#0a192f', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(stats.unlockedMedals / 20) * 100}%`, height: '100%', background: '#64ffda' }} />
              </div>
              <span style={{ fontSize: '0.8rem' }}>{stats.unlockedMedals}/20</span>
            </div>
          </div>

          <div style={{ background: '#112240', padding: '20px' }}>
            <h3 style={{ marginTop: 0, color: '#8892b0', fontSize: '0.9rem' }}>FAVORITE_CLASS</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' }}>
              <span style={{ fontSize: '2rem' }}>{stats.favAvatar === 'runner' ? '❖' : '◈'}</span>
              <span style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>{stats.favAvatar}</span>
            </div>
          </div>
        </section>
      </div>

      {/* DANGEROUS AREA */}
      <footer style={{ marginTop: '50px', padding: '30px', border: '1px dashed #ff5f5f', textAlign: 'center' }}>
        {!showConfirm ? (
          <button 
            onClick={() => setShowConfirm(true)}
            style={{ background: 'transparent', color: '#ff5f5f', border: '1px solid #ff5f5f', padding: '10px 20px', cursor: 'pointer', fontFamily: 'monospace' }}
          >
            INITIATE_FACTORY_RESET
          </button>
        ) : (
          <div>
            <p style={{ color: '#ff5f5f', fontSize: '0.8rem', marginBottom: '15px' }}>WARNING: THIS WILL PERMANENTLY ERASE ALL PROGRESS. CONTINUE?</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <button onClick={handleReset} style={{ background: '#ff5f5f', color: '#0a192f', border: 'none', padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer' }}>
                YES_ERASE_ALL
              </button>
              <button onClick={() => setShowConfirm(false)} style={{ background: '#8892b0', color: '#0a192f', border: 'none', padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer' }}>
                CANCEL
              </button>
            </div>
          </div>
        )}
      </footer>
    </div>
  );
};

export default Profile;
