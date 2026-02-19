import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

/**
 * Challenges Component
 * Users complete "Neural Tasks" to earn sync percentage boosts.
 */
const Challenges = () => {
  const { setProgress } = useOutletContext<{ setProgress: React.Dispatch<React.SetStateAction<number>> }>();
  
  // Track which challenges have been claimed this session
  const [claimed, setClaimed] = useState<string[]>([]);

  const missions = [
    { id: 'c1', title: "Signal Flare", task: "Locate the Alpha Tower on the Map.", reward: 5 },
    { id: 'c2', title: "Deep Dive", task: "Equip a Biometric Link in Gear.", reward: 10 },
    { id: 'c3', title: "Ghost Protocol", task: "Reach 50% Sync Level.", reward: 15 },
    { id: 'c4', title: "Data Miner", task: "Read all Survival Logs on Home.", reward: 5 }
  ];

  const claimReward = (id: string, reward: number) => {
    if (claimed.includes(id)) return;

    setClaimed([...claimed, id]);
    setProgress(prev => {
      const nextValue = Math.min(prev + reward, 100);
      localStorage.setItem('survivor_progress', nextValue.toString());
      return nextValue;
    });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', minHeight: '80vh' }}>
      <h1 style={{ color: '#35c9ff', fontFamily: 'monospace', marginBottom: '30px' }}>
        > NEURAL_CHALLENGES
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {missions.map((m) => {
          const isDone = claimed.includes(m.id);
          return (
            <div key={m.id} style={{
              background: isDone ? 'rgba(100, 255, 218, 0.05)' : 'rgba(17, 34, 64, 0.6)',
              border: `1px solid ${isDone ? '#64ffda' : '#35c9ff'}`,
              borderRadius: '10px',
              padding: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'all 0.3s ease'
            }}>
              <div>
                <h3 style={{ color: isDone ? '#64ffda' : '#35c9ff', margin: '0 0 5px 0', fontFamily: 'monospace' }}>
                  {m.title} {isDone && "✓"}
                </h3>
                <p style={{ color: '#8892b0', fontSize: '0.9rem', margin: 0 }}>{m.task}</p>
              </div>

              <button
                onClick={() => claimReward(m.id, m.reward)}
                disabled={isDone}
                style={{
                  background: isDone ? 'transparent' : 'rgba(53, 201, 255, 0.1)',
                  border: `1px solid ${isDone ? '#64ffda' : '#35c9ff'}`,
                  color: isDone ? '#64ffda' : '#35c9ff',
                  padding: '8px 15px',
                  borderRadius: '4px',
                  cursor: isDone ? 'default' : 'pointer',
                  fontSize: '0.8rem',
                  fontFamily: 'monospace'
                }}
              >
                {isDone ? "SYNC_ADDED" : `CLAIM +${m.reward}%`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Challenges;
