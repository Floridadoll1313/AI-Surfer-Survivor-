import React from 'react';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
  const navigate = useNavigate();
  const rawData = localStorage.getItem('survivor_leaderboard');
  const scores = rawData ? JSON.parse(rawData) : [];

  const avatarIcons: Record<string, string> = { ghost: '◈', runner: '❖', void: '⬢', surfer: '🌀' };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', fontFamily: 'monospace', color: '#64ffda', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '30px' }}>&gt; HALL_OF_FAME</h1>

      <div style={{ border: '1px solid #233554', background: '#112240', borderRadius: '4px', overflow: 'hidden' }}>
        {scores.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#233554', color: '#8892b0', fontSize: '0.8rem' }}>
                <th style={{ padding: '15px' }}>RANK</th>
                <th>AVATAR</th>
                <th>SCORE</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((entry: any, i: number) => (
                <tr key={i} style={{ borderBottom: '1px solid #233554' }}>
                  <td style={{ padding: '15px', color: i === 0 ? '#ffcc00' : '#64ffda' }}>#{i + 1}</td>
                  <td style={{ fontSize: '1.2rem' }}>{avatarIcons[entry.avatar] || '❖'}</td>
                  <td style={{ fontWeight: 'bold' }}>{entry.score.toLocaleString()}</td>
                  <td style={{ fontSize: '0.7rem', color: '#8892b0' }}>{entry.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: '40px', color: '#4e566d' }}>NO_DATA_FOUND_IN_SECTOR</div>
        )}
      </div>

      <button 
        onClick={() => navigate('/')} 
        style={{ marginTop: '30px', padding: '15px 30px', background: 'none', border: '1px solid #64ffda', color: '#64ffda', cursor: 'pointer' }}
      >
        RETURN_TO_HUB
      </button>
    </div>
  );
};

export default Leaderboard;
