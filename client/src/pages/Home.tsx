// Inside your Home component...
const [missionStatus, setMissionStatus] = useState({
  survivor: localStorage.getItem('mission_survivor') === 'done',
  highSync: localStorage.getItem('mission_sync') === 'done'
});

const claimMission = (id: 'survivor' | 'highSync', reward: number) => {
  const currentWallet = Number(localStorage.getItem('survivor_wallet')) || 0;
  localStorage.setItem('survivor_wallet', (currentWallet + reward).toString());
  localStorage.setItem(`mission_${id}`, 'done');
  setMissionStatus(prev => ({ ...prev, [id]: true }));
  alert(`REWARD_CLAIMED: +${reward} XP`);
};

// Add this section below your "System Status" cards:
<div style={{ marginTop: '30px', border: '1px solid #64ffda', padding: '20px', borderRadius: '4px' }}>
  <h3 style={{ color: '#64ffda' }}>&gt; ACTIVE_MISSIONS</h3>
  
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
    <span style={{ color: '#8892b0' }}>[01] REACH_LEVEL_10</span>
    {!missionStatus.survivor ? (
      <button 
        onClick={() => claimMission('survivor', 2000)}
        disabled={Number(localStorage.getItem('survivor_high_score')) < 5000} // Assuming Level 10 is ~5000 XP
        style={{ background: '#112240', color: '#64ffda', border: '1px solid #64ffda', cursor: 'pointer' }}
      >
        CLAIM_2000_XP
      </button>
    ) : <span style={{ color: '#4e566d' }}>COMPLETED</span>}
  </div>

  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <span style={{ color: '#8892b0' }}>[02] COLLECT_50_FRAGMENTS</span>
    {!missionStatus.highSync ? (
      <button 
        onClick={() => claimMission('highSync', 1000)}
        disabled={Number(localStorage.getItem('survivor_wallet')) < 500}
        style={{ background: '#112240', color: '#64ffda', border: '1px solid #64ffda', cursor: 'pointer' }}
      >
        CLAIM_1000_XP
      </button>
    ) : <span style={{ color: '#4e566d' }}>COMPLETED</span>}
  </div>
</div>
