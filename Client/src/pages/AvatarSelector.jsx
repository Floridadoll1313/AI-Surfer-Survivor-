import { getLevelInfo } from '../data/leveling';

// Inside the .map() of AvatarSelector:
const info = getLevelInfo(av.id);

return (
  <div key={av.id} onClick={() => setSelectedAvatar(av.id)} style={{ /* ... existing styles */ }}>
    <div style={{ flexGrow: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{av.label}</span>
        <span style={{ fontSize: '0.7rem', color: '#64ffda' }}>LVL {info.level}</span>
      </div>
      
      {/* Mini Progress Bar */}
      <div style={{ height: '4px', background: '#0a192f', marginTop: '5px', width: '100%' }}>
        <div style={{ 
          height: '100%', 
          background: '#64ffda', 
          width: `${(info.currentXp / info.nextLevelXp) * 100}%` 
        }} />
      </div>
    </div>
  </div>
);
