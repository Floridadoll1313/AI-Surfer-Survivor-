import React from 'react';

const Challenges = () => {
  const questLog = [
    { id: 1, title: "Neural Linkage", status: "COMPLETED" },
    { id: 2, title: "Island Perimeter Scan", status: "IN_PROGRESS" },
    { id: 3, title: "Survivor Protocol Alpha", status: "LOCKED" }
  ];

  return (
    <div className="terminal-content" style={{ color: '#00ff00', padding: '20px' }}>
      <h2>[ QUEST_LOG_v1.0 ]</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {questLog.map(quest => (
          <li key={quest.id} style={{ marginBottom: '10px', borderBottom: '1px solid #333' }}>
            <span style={{ fontWeight: 'bold' }}>{quest.title}</span> — 
            <span style={{ color: quest.status === 'COMPLETED' ? '#00ff00' : '#ff0000' }}> [{quest.status}]</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Challenges;
