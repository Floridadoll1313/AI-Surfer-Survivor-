import React from 'react';

/**
 * Diagnostic Component
 * Summarizes user progress, logs, and identity status.
 */
const Diagnostic = () => {
  // Pull data from all local systems
  const syncLevel = localStorage.getItem('survivor_progress') || '0';
  const avatarId = localStorage.getItem('survivor_avatar') || 'ghost';
  const logs = JSON.parse(localStorage.getItem('survivor_user_logs') || '[]');
  const lastClaim = localStorage.getItem('survivor_last_claim');

  const stats = [
    { label: "NEURAL_SYNC_LEVEL", value: `${syncLevel}%` },
    { label: "IDENTITY_TAG", value: avatarId.toUpperCase() },
    { label: "TOTAL_LOGS_RECORDED", value: logs.length.toString() },
    { label: "LAST_UPLINK", value: lastClaim ? new Date(parseInt(lastClaim)).toLocaleDateString() : "NEVER" }
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', color: '#ffffff', fontFamily: 'monospace' }}>
      <h1 style={{ color: '#35c9ff', marginBottom: '30px' }}>> SYSTEM_DIAGNOSTIC_REPORT</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px' 
      }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ 
            padding: '20px', 
            background: 'rgba(17, 34, 64, 0.6)', 
            border: '1px solid #35c9ff',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ color: '#8892b0', fontSize: '0.7rem', marginBottom: '10px' }}>{stat.label}</div>
            <div style={{ color: '#64ffda', fontSize: '1.5rem', fontWeight: 'bold' }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '40px', padding: '20px', background: 'rgba(2, 12, 27, 0.5)', border: '1px dashed #35c9ff' }}>
        <h3 style={{ color: '#35c9ff', marginTop: 0 }}>INTEGRITY_CHECK:</h3>
        <p style={{ color: '#ccd6f6', fontSize: '0.9rem' }}>
          {parseInt(syncLevel) > 50 
            ? "STATUS: SYSTEM STABLE. SYNCHRONIZATION WITHIN OPTIMAL PARAMETERS." 
            : "STATUS: CRITICAL. LOW SYNC DETECTED. VISIT GEAR OR MISSIONS TO STABILIZE."}
        </p>
      </div>
    </div>
  );
};

export default Diagnostic;
