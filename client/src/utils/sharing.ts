/**
 * Generates a text-based "Cyber-Card" for players to share their achievements.
 * @param score - The final numerical score achieved.
 * @param combo - The highest combo multiplier reached.
 * @param avatar - The ID of the avatar used (ghost, runner, void, surfer).
 * @returns A formatted string ready for clipboard copying.
 */
export const generateCyberCard = (score: number, combo: number, avatar: string): string => {
  const date = new Date().toLocaleDateString();
  
  // Map internal IDs to their visual icons
  const avatarIcons: Record<string, string> = {
    ghost: '◈',
    runner: '❖',
    void: '⬢',
    surfer: '🌀'
  };

  const icon = avatarIcons[avatar] || '❖';
  const name = avatar.toUpperCase();

  return `
--- [ NEURAL_LINK_RECORD ] ---
ID: ${name} ${icon}
SCORE: ${score.toLocaleString()}
MAX_COMBO: ${combo}x
DATE: ${date}
------------------------------
> STATUS: SURVIVED_THE_GRID
https://github.com/Floridadoll1313/AI-Surfer-Survivor-
  `;
};

/**
 * Copies text to the user's clipboard and returns a promise for feedback handling.
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy neural record:', err);
    return false;
  }
};
