export const HINT_DATABASE = {
  avoidance: `// Enemy Avoidance logic
const dist = Math.abs(player.x - enemy.x) + Math.abs(player.y - enemy.y);
if (dist < 3) {
  // Move in the opposite direction of the enemy
  return { 
    dx: player.x > enemy.x ? 1 : -1, 
    dy: player.y > enemy.y ? 1 : -1 
  };
}`,

  sorting: `// Closest Target Sorting (Manhattan Distance)
const sorted = fragments.sort((a, b) => {
  const distA = Math.abs(player.x - a.x) + Math.abs(player.y - a.y);
  const distB = Math.abs(player.x - b.x) + Math.abs(player.y - b.y);
  return distA - distB;
});
const target = sorted[0]; // This is now your closest fragment
if (target) {
  return {
    dx: target.x > player.x ? 1 : target.x < player.x ? -1 : 0,
    dy: target.y > player.y ? 1 : target.y < player.y ? -1 : 0
  };
}`
};
