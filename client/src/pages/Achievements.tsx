import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Medal {
  id: string;
  title: string;
  requirement: string;
  icon: string;
  rarity: 'COMMON' | 'RARE' | 'ELITE';
}

const Achievements = () => {
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState<string[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('achievements_unlocked') || '[]');
    setUnlocked(saved);
  }, []);

  const medals: Medal[] = [
    { id: 'a1', title: 'FIRST_CONTACT', requirement: 'Extract your first data fragment.', icon: '🛰️', rarity: 'COMMON' },
    { id: 'a2', title: 'GHOST_IN_THE_SHELL', requirement: 'Survive a collision using a shield.', icon: '👻', rarity: 'COMMON' },
    { id: 'a3', title: 'COMBO_KING', requirement: 'Reach a x5 score multiplier.', icon: '👑', rarity: 'RARE' },
    { id: 'a4', title: 'DATA_MINER', requirement: 'Accumulate 10,000 lifetime XP.', icon: '⛏️', rarity: 'RARE' },
    { id: 'a5', title: 'SYSTEM_CLEANSER', requirement: 'Complete a run without getting corrupted.', icon: '🧼', rarity: 'ELITE' },
    { id: 'a6', title: 'ZERO_DAY', requirement: 'Score 5,000 points in a single run.', icon: '☣️', rarity: 'ELITE' },
  ];

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'monospace', color: '#64ffda', backgroundColor: '#0a192f', minHeight: '100vh' }}>
      <header style={{ borderBottom: '1px solid #112240', paddingBottom: '20px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem' }}>&gt; MEDAL_VAULT</h1>
          <p style={{ color: '#8892b0' }}>SYNC_STATUS: {unlocked.length} / {medals.length} DECODED</p>
        </div>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: '1px solid #64ffda', color: '#64ffda', padding: '10px 20px', cursor: 'pointer' }}>
          RETURN_TO_HUB
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {medals.map((medal) => {
          const isUnlocked = unlocked.includes(medal.id);
          const rarityColor = medal.rarity === 'ELITE' ? '#ff00ff' : medal.rarity === 'RARE' ? '#35c9ff' : '#64ffda';

          return (
            <div key={medal.id} style={{ 
              background: isUnlocked ? '#112240' : 'rgba(17, 34, 64, 0.2)', 
              padding: '20px', 
              border: `1px solid ${isUnlocked ? rarityColor : '#233554'}`,
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.2s'
            }}>
              {/* Achievement status ribbon */}
              <div style={{ 
                position: 'absolute', top: '10px', right: '-30px', transform: 'rotate(45deg)', 
                background: isUnlocked ? rarityColor : '#233554', color: '#0a192f', 
                fontSize: '0.6rem', fontWeight: 'bold', width: '100px', textAlign: 'center' 
              }}>
                {isUnlocked ? 'SYNCED' : 'LOCKED'}
              </div>

              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ 
                  fontSize: '2.5rem', 
                  filter: isUnlocked ? 'none' : 'grayscale(1) blur(2px)', 
                  opacity: isUnlocked ? 1 : 0.3 
                }}>
                  {medal.icon}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1rem', color: isUnlocked ? '#fff' : '#4e566d' }}>{medal.title}</h3>
                  <p style={{ margin: '5px 0 0', fontSize: '0.75rem', color: '#8892b0' }}>{medal.requirement}</p>
                </div>
              </div>
              
              {isUnlocked && (
                <div style={{ marginTop: '15px', fontSize: '0.6rem', color: rarityColor, letterSpacing: '1px' }}>
                  CLASS: {medal.rarity} // ACCESS_GRANTED
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
