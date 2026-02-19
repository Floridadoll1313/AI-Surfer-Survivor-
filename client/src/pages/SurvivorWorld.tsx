// Inside your collection useEffect:
const fIdx = fragments.findIndex(f => check(f.x, f.y));
if (fIdx !== -1) {
  setScore(s => s + 100);
  
  // VULNERABILITY LOGIC
  if (bossActive) {
    const newStreak = fragmentStreak + 1;
    setFragmentStreak(newStreak);
    
    if (newStreak >= 5) {
      setBossStunned(true);
      setFragmentStreak(0);
      addLog('SYSTEM_EXPLOIT: BOSS_STUNNED');
      
      // Freeze the boss for 3 seconds
      setTimeout(() => {
        setBossStunned(false);
        addLog('WARNING: BOSS_REBOOT_COMPLETE');
      }, 3000);
    }
  }

  // ... rest of fragment replacement logic
}

// Inside your AI Movement Loop:
useEffect(() => {
  const move = setInterval(() => {
    if (isGameOver || bossStunned) return; // Boss stops moving if stunned
    
    // ... rest of Boss/Enemy movement logic
  }, BASE_SPEED + speedBonus);
  return () => clearInterval(move);
}, [playerPosition, isGameOver, bossActive, bossStunned]);
