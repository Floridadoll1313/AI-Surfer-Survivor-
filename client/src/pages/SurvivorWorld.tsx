<div style={{ 
  marginTop: '10px', 
  padding: '10px', 
  background: '#0a0a0a', 
  border: '1px solid #222', 
  fontFamily: 'monospace',
  fontSize: '0.75rem'
}}>
  <div style={{ color: THEME_COLOR, borderBottom: '1px solid #222', marginBottom: '5px' }}>
    🛰️ MISSION_CONTROL_STATUS
  </div>
  <div style={{ color: autoPilot ? '#64ffda' : '#888' }}>
    > SYSTEM: {autoPilot ? 'AUTOPILOT_ACTIVE' : 'MANUAL_OVERRIDE_REQUIRED'}
  </div>
  <div style={{ color: '#888' }}>
    > TELEMETRY: P[{playerPosition.x},{playerPosition.y}] | E[{enemyPosition.x},{enemyPosition.y}]
  </div>
  <div style={{ color: '#ffcc00' }}>
    > DATA_SHARDS_REMAINING: {fragments.length}
  </div>
  {isGameOver && (
    <div style={{ color: '#ff0055', marginTop: '5px', fontWeight: 'bold' }}>
      > CRITICAL_FAILURE: COLLISION_DETECTED
    </div>
  )}
</div>
