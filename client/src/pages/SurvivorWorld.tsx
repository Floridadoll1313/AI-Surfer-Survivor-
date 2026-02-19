// Inside SurvivorWorld.tsx
const { speedBonus } = getLevelInfo(selectedAvatar);

useEffect(() => {
  const move = setInterval(() => {
    // We ADD the speedBonus to the delay, making enemies effectively slower
    const effectiveSpeed = BASE_SPEED + speedBonus; 
    
    // ... rest of movement logic
  }, effectiveSpeed);
  return () => clearInterval(move);
}, [speedBonus]);
