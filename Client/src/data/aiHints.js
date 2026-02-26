export const HINT_DATABASE = {
  avoidance: `// Hint: Basic Enemy Avoidance
const dist = Math.abs(player.x - enemy.x) + Math.abs(player.y - enemy.y);
if (dist < 3) {
  return { 
    dx: player.x > enemy.x ? 1 : -1, 
    dy: player.y > enemy.y ? 1 : -1 
  };
}`,

  sorting: `// Hint: Manhattan Distance Sorting
const sorted = fragments.sort((a, b) => {
  const distA = Math.abs(player.x - a.x) + Math.abs(player.y - a.y);
  const distB = Math.abs(player.x - b.x) + Math.abs(player.y - b.y);
  return distA - distB;
});
const target = sorted[0];
if (target) {
  return {
    dx: target.x > player.x ? 1 : target.x < player.x ? -1 : 0,
    dy: target.y > player.y ? 1 : target.y < player.y ? -1 : 0
  };
}`,

  pathfinding: `// Hint: Mutation Awareness (Obstacle Avoidance)
const target = fragments[0];
if (target) {
  let dx = target.x > player.x ? 1 : target.x < player.x ? -1 : 0;
  let dy = target.y > player.y ? 1 : target.y < player.y ? -1 : 0;

  // Check if move hits a Static Glitch
  const isBlocked = obstacles.some(o => o.x === player.x + dx && o.y === player.y + dy);
  if (isBlocked) {
    log("Path blocked! Diverting...");
    return { dx: dy, dy: dx }; // Simple pivot logic
  }
  return { dx, dy };
}`
};
