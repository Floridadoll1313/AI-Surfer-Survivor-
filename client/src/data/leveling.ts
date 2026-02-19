export const getLevelInfo = (avatarId: string) => {
  const totalXp = Number(localStorage.getItem(`xp_${avatarId}`)) || 0;
  
  // Basic leveling formula
  let level = 1;
  let xpNeeded = 1000;
  let currentXp = totalXp;

  while (currentXp >= level * 1000) {
    currentXp -= (level * 1000);
    level++;
  }

  // Bonus Stats based on level
  const speedBonus = (level - 1) * 20; // -20ms delay per level
  
  return { level, currentXp, nextLevelXp: level * 1000, speedBonus };
};
