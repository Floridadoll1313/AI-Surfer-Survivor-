const handleGameOver = useCallback(async () => {
  setIsGameOver(true);
  const finalScore = score * XP_MULTIPLIER;
  
  // Update local for immediate feedback
  localStorage.setItem('survivor_wallet', (wallet + finalScore).toString());

  // SEND TO GLOBAL DATABASE
  try {
    const response = await fetch('http://localhost:5000/api/save-score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: "Player_1", // You can add a name prompt later
        score: finalScore,
        avatar: selectedAvatar
      })
    });
    const data = await response.json();
    console.log("Global Leaderboard Updated:", data.leaderboard);
  } catch (err) {
    console.error("Failed to sync with global database", err);
  }
}, [score, wallet, XP_MULTIPLIER, selectedAvatar]);
