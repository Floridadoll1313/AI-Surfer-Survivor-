import React from 'react';
import { Link } from 'react-router-dom';

const Leaderboard = () => {
  // In a real app, these would come from a database. 
  // For now, we pull the local player's best and use placeholders for others.
  const localHighScore = localStorage.getItem('survivor_high_score') || '0';

  const rankings = [
    { rank: 1, id: 'surfer', label: 'AI_SURFER', score: Math.max(Number(localHighScore), 2500), isPlayer: Number(localHighScore) >= 2500 },
    { rank: 2, id: 'runner', label: 'TIDE_RUNNER', score: 1800, isPlayer: false },
    { rank: 3, id: 'ghost', label: 'NEURAL_GHOST', score: 1200, isPlayer: false },
    { rank: 4, id: 'void', label: 'VOID_WALKER', score: 900, isPlayer: false },
  ].sort((a, b) => b.score - a.score);

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'monospace', color: '#ffffff' }}>
      <h1 style={{ color: '#35c9ff', textAlign: 'center', letterSpacing: '3px' }}>&gt; GLOBAL_LEADERBOARD</h1>
      
      <div style={{ marginTop: '30px', border: '1px solid #35c9ff', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(17, 34, 64, 0.6)' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #35c9ff', color: '#64ffda' }}>
              <th style={{ padding: '15px', textAlign: 'left' }}>RANK</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>IDENTITY</th>
              <th style={{ padding: '15px', textAlign: 'right' }}>SYNC_XP</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((r, index) => (
              <tr key={r.id} style={{ 
                borderBottom: '1px solid rgba(53, 201, 255, 0.1)',
                backgroundColor: r.isPlayer ? 'rgba(100, 255, 218, 0.05)' : 'transparent'
              }}>
                <td style={{ padding: '15px', color: '#8892b0' }}>#{index + 1}</td>
                <td style={{ padding: '15px', fontWeight: 'bold', color: '#35c9ff' }}>
                  {r.label} {r.isPlayer && <span style={{ color: '#64ffda', fontSize: '0.7rem' }}>[YOU]</span>}
                </td>
                <td style={{ padding: '15px', textAlign: 'right', color: '#64ffda' }}>{r.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <Link to="/game" style={{
          padding: '12px 30px',
          backgroundColor: '#35c9ff',
          color: '#0a192f',
          textDecoration: 'none',
          fontWeight: 'bold',
          borderRadius: '4px',
          display: 'inline-block'
        }}>
          RETURN_TO_GRID
        </Link>
      </div>
    </div>
  );
};

export default Leaderboard;
