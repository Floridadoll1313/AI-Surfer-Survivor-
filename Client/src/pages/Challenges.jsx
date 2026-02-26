import React from 'react';

const Challenges = () => {
  const missions = [
    { id: 'CH-01', title: "Neural Link Initiation", type: "Onboarding", status: "COMPLETED" },
    { id: 'CH-02', title: "Island Perimeter Scan", type: "Exploration", status: "IN_PROGRESS" },
    { id: 'CH-03', title: "The Founders Protocol", type: "Lore", status: "LOCKED" },
    { id: 'CH-04', title: "Gear Synchronization", type: "Maintenance", status: "AVAILABLE" }
  ];

  return (
    <div className="terminal-content" style={{ padding: '30px', color: '#00ff00', fontFamily: 'monospace' }}>
      <h2 style={{ borderBottom: '2px solid #00ff00', paddingBottom: '10px' }}>
        [ MISSION_LOG: ACTIVE_CHALLENGES ]
      </h2>
      
      <div className="mission-grid" style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
        {missions.map(mission => (
          <div key={mission.id} style={{ 
            border: '1px solid #004400', 
            padding: '15px', 
            backgroundColor: 'rgba(0, 20, 0, 0.5)',
            boxShadow: 'inset 0 0 10px #002200'
          }}>
            <div style={{ fontSize: '0.8rem', color: '#888' }}>ID: {mission.id}</div>
            <div style={{ fontSize: '1.2rem', margin: '5px 0' }}>{mission.title}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>TYPE: {mission.type}</span>
              <span style={{ 
                color: mission.status === 'COMPLETED' ? '#00ff00' : 
                       mission.status === 'IN_PROGRESS' ? '#ffff00' : '#ff0000',
                fontWeight: 'bold'
              }}>
                [{mission.status}]
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challenges;
