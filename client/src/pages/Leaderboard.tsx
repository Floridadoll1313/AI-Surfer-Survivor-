import React from 'react';

const Leaderboard = () => {
  const rankings = [
    { rank: 1, name: "Neon_Ghost", sync: 99 },
    { rank: 2, name: "Tide_Runner", sync: 85 },
    { rank: 3, name: "Echo_Pulse", sync: 72 }
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', color: '#ffffff', fontFamily: 'monospace' }}>
      <h1 style={{ color: '#35c9ff', textAlign: 'center' }}>&gt; GLOBAL_RANKINGS</h1>
      <div style={{ background: '#112240', border: '1px solid #35c9ff', borderRadius: '12px', overflow: 'hidden' }}>
        {rankings.map(r => (
          <div key={r.rank} style={{ padding: '20px', borderBottom: '1px solid rgba(53,201,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>#{r.rank} {r.name}</span>
            <div style={{ width: '200px', height: '10px', background: '#0a192f', borderRadius: '5px' }}>
              <div style={{ width: `${r.sync}%`, height: '100%', background: '#64ffda', boxShadow: '0 0 10px #64ffda' }} />
            </div>
            <span style={{ color: '#64ffda' }}>{r.sync}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
