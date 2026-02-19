// Inside SurvivorWorld.tsx session state:
const [timeElapsed, setTimeElapsed] = useState(0);
const [dynamicSpeedScale, setDynamicSpeedScale] = useState(0);

// --- DIFFICULTY SCALER ---
useEffect(() => {
  if (isGameOver) return;

  const timer = setInterval(() => {
    setTimeElapsed(prev => {
      const newTime = prev + 1;
      
      // Every 60 seconds, increase difficulty
      if (newTime % 60 === 0) {
        setDynamicSpeedScale(d => d + 50); // Speed increases by 50ms every minute
        addLog('SYSTEM_ALERT: DIFFICULTY_LEVEL_INCREASED');
        playSound('boss'); // Use boss sound as a warning chime
      }
      return newTime;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [isGameOver]);

// Update your move interval to include the dynamic scale:
useEffect(() => {
  const move = setInterval(() => {
    if (isGameOver || bossStunned) return;

    // We SUBTRACT dynamicSpeedScale to make the interval shorter (faster)
    const currentInterval = Math.max(200, BASE_SPEED + speedBonus - dynamicSpeedScale);
    
    // ... rest of movement logic
  }, currentInterval);
  return () => clearInterval(move);
}, [playerPosition, isGameOver, bossActive, bossStunned, dynamicSpeedScale]);
