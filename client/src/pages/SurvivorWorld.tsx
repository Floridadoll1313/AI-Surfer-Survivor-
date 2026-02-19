const unlockMedal = (id: string) => {
  const current = JSON.parse(localStorage.getItem('achievements_unlocked') || '[]');
  if (!current.includes(id)) {
    const updated = [...current, id];
    localStorage.setItem('achievements_unlocked', JSON.stringify(updated));
    addLog(`SYSTEM_UPDATE: MEDAL_EARNED [${id}]`);
  }
};

// Example trigger inside the fragment collection logic:
if (score >= 5000) unlockMedal('a6');
