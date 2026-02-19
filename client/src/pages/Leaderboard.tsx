import React from 'react';

/**
 * Leaderboard Component
 * Displays the top surfers in the realm with detailed sync bars.
 */
const Leaderboard = () => {
  const rankings = [
    { rank: 1, name: "Neon_Ghost", sync: 99, status: "Ascended" },
    { rank: 2, name: "Tide_Runner", sync: 85, status: "Active" },
    { rank: 3, name: "Echo_Pulse", sync: 72, status: "Active" },
    { rank: 4, name: "Bit_Surfer", sync: 45, status: "Syncing" }
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', minHeight: '80vh' }}>
      <h1 style={{ color: '#35c9ff', textAlign: 'center', marginBottom: '40px', fontFamily: 'monospace' }}>
        > GLOBAL_SYNC_RANKINGS
      </h1>
      
      <div style={{ 
        background: 'rgba(17, 34, 64, 0.8)', 
        borderRadius: '15px', 
        border: '1px solid #35c9ff', 
        overflow: 'hidden',
        boxShadow: '0 0 30px rgba(53, 201, 255, 0.1)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#ffffff', fontFamily: 'monospace' }}>
          <thead>
            <tr style={{ background: 'rgba(53, 201, 255, 0.1)', color: '#35c9ff', textAlign: 'left' }}>
              <th style={{ padding: '20px' }}>RANK</th>
              <th style={{ padding: '20px' }}>SURFER_ID</th>
              <th style={{ padding: '20px' }}>SYNC_PROGRESS</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((user) => (
              <tr key={user.rank} style={{ borderBottom: '1px solid rgba(53, 201, 255, 0.1)' }}>
                <td style={{ padding: '20px', fontWeight: 'bold', color: user.rank === 1 ? '#64ffda' : '#ffffff' }}>
                  #{user.rank}
                </td>
                <td style={{ padding: '20px' }}>{user.name}</td>
                <td style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ flex: 1, height: '8px', background: '#0a192f', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ 
                        width: `${user.sync}%`, 
                        height: '100%', 
                        background: user.rank === 1 ? '#64ffda' : '#35c9ff',
                        boxShadow: `0 0 10px ${user.rank === 1 ? '#64ffda' : '#35c9ff'}`
                      }} />
                    </div>
                    <span style={{ fontSize: '0.85rem' }}>{user.sync}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
