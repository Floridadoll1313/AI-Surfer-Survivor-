import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Medal {
  id: string;
  title: string;
  desc: string;
  icon: string;
  requirement: string;
}

const Achievements = () => {
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState<string[]>([]);

  // The master list of all 20 potential achievements
  const allMedals: Medal[] = [
    { id: 'score_1k', title: 'DATA_SCRAPER', desc: 'Reached 1,000 score in a single run.', icon: '💾', requirement: '1,000 pts' },
    { id: 'score_5k', title: 'ELITE_SURFER', desc: 'Reached 5,000 score in a single run.', icon: '🏄', requirement: '5,000 pts' },
    { id: 'score_10k', title: 'NEURAL_GOD', desc: 'Reached 10,000 score in a single run.', icon: '🧠', requirement: '10,000 pts' },
    { id: 'boss_slayer', title: 'DAREDEVIL', desc: 'Survived a Boss Incursion.', icon: '⚔️', requirement: 'Boss Event' },
    { id: 'xp_10k', title: 'DATA_MINER', desc: 'Collected 10,000 lifetime XP.', icon: '💎', requirement: '10k Wallet' },
    { id: 'xp_50k', title: 'ARCHIVIST', desc: 'Collected 50,000 lifetime XP.', icon: '🏛️', requirement: '50k Wallet' },
    { id: 'combo_5', title: 'SYNC_MASTER', desc: 'Maintained a x5 combo.', icon: '⚡', requirement: 'x5 Combo' },
    { id: 'shield_hero', title: 'HARDENED_SHELL', desc: 'Used a shield to survive a hit.', icon: '🛡️', requirement: 'Shield Use' },
    { id: 'daily_hero', title: 'CONSISTENT_FLOW', desc: 'Completed a Daily Mission.', icon: '📅', requirement: 'Daily Goal' },
    { id: 'all_avatars', title: 'POLYMORPH', desc: 'Played as every avatar type.', icon: '🎭', requirement: 'All Classes' },
    // Add more medals here up to 20...
  ];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('achievements_unlocked') || '[]');
    setUnlocked(saved);
  }, []);

  const progressPercentage = Math.round((unlocked.length / allMedals.length) * 100);

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', fontFamily: 'monospace', color: '#64ffda', backgroundColor: '#0a192f', minHeight: '100vh' }}>
      <header style={{ marginBottom: '40px', borderBottom: '1px solid #112240', paddingBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem' }}>&gt; MEDAL_VAULT</h1>
          <p style={{ color: '#8892b0', margin: '5px 0' }}>SYSTEM_COMPLETION: {progressPercentage}%</p>
        </div>
        <button 
          onClick={() => navigate('/')} 
          style={{ background: 'none', border: '1px solid #64ffda', color: '#64ffda', padding: '10px 20px', cursor: 'pointer' }}
        >
          RETURN_HOME
        </button>
      </header>

      {/* PROGRESS BAR */}
      <div style={{ width: '100%', height: '10px', background: '#112240', marginBottom: '40px', borderRadius: '5px', overflow: 'hidden' }}>
        <div style={{ width: `${progressPercentage}%`, height: '100%', background: '#64ffda', transition: 'width 1s ease-in-out' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {allMedals.map((medal) => {
          const isUnlocked = unlocked.includes(medal.id);
          return (
            <div key={medal.id} style={{
              padding: '20px',
              border: `1px solid ${isUnlocked ? '#64ffda' : '#233554'}`,
              background: isUnlocked ? 'rgba(100, 255, 218, 0.05)' : '#112240',
              opacity: isUnlocked ? 1 : 0.5,
              transition: 'transform 0.2s',
              position: 'relative'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px', filter: isUnlocked ? 'none' : 'grayscale(100%)' }}>
                {medal.icon}
              </div>
              <h3 style={{ margin: '0 0 5px 0', color: isUnlocked ? '#64ffda' : '#8892b0', fontSize: '0.9rem' }}>
                {isUnlocked ? medal.title : '????????'}
              </h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#8892b0' }}>
                {isUnlocked ? medal.desc : `Locked: ${medal.requirement}`}
              </p>
              {!isUnlocked && (
                <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '0.7rem', color: '#ff5f5f' }}>
                  LOCKED
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;
