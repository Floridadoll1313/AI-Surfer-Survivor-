export const generateCyberCard = (score: number, combo: number, avatar: string) => {
  const date = new Date().toLocaleDateString();
  const icon = avatar === 'ghost' ? '◈' : avatar === 'runner' ? '❖' : avatar === 'void' ? '⬢' : '🌀';
  
  return `
--- [ NEURAL_LINK_RECORD ] ---
ID: ${avatar.toUpperCase()} ${icon}
SCORE: ${score.toLocaleString()}
MAX_COMBO: ${combo}x
DATE: ${date}
------------------------------
> STATUS: SURVIVED_THE_GRID
  `;
};
