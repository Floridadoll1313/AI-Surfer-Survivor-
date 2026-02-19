// Inside Home.tsx state
const [isHardMode, setIsHardMode] = useState(localStorage.getItem('hard_mode_enabled') === 'true');

const toggleHardMode = () => {
  const newState = !isHardMode;
  setIsHardMode(newState);
  localStorage.setItem('hard_mode_enabled', newState.toString());
};

// Add this UI element above the "LAUNCH_SIMULATION" button
<div style={{ 
  margin: '15px 0', 
  padding: '10px', 
  border: `1px solid ${isHardMode ? '#ff5f5f' : '#4e566d'}`,
  display: 'flex', 
  justifyContent: 'space-between',
  alignItems: 'center'
}}>
  <span style={{ color: isHardMode ? '#ff5f5f' : '#8892b0' }}>
    {isHardMode ? 'OVERCLOCK_ACTIVE (3x XP)' : 'STANDARD_PROTOCOL'}
  </span>
  <button 
    onClick={toggleHardMode}
    style={{
      background: isHardMode ? '#ff5f5f' : '#112240',
      color: isHardMode ? '#0a192f' : '#64ffda',
      border: 'none',
      padding: '5px 15px',
      cursor: 'pointer',
      fontWeight: 'bold'
    }}
  >
    {isHardMode ? 'ON' : 'OFF'}
  </button>
</div>
