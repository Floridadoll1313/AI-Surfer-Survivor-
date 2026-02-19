export interface Lesson {
  id: number;
  title: string;
  description: string;
  content: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const lessonsData: Lesson[] = [
  {
    id: 1,
    title: "The Neural Link",
    description: "Learn the basics of controlling your agent using coordinate geometry.",
    content: "In the Never-Ending Realm, your agent moves on a 10x10 grid. Coordinates start at (0,0) in the top-left corner. To move, your function must return a displacement object: { dx: 1, dy: 0 } moves you right, while { dx: 0, dy: -1 } moves you up. Your first task is to reach the fragments (✦) while avoiding the hunter (⚡).",
    difficulty: "Beginner"
  },
  {
    id: 2,
    title: "Static Glitch Avoidance",
    description: "Navigate through the realm's mutations and obstacles.",
    content: "As the Realm evolves, Static Glitches (█) appear. These are obstacles that block your path. Your code now receives an 'obstacles' array. Use the 'pathfinding' hint to learn how to check if a move is blocked before you make it. If a path is blocked, try diverting your movement to a different axis.",
    difficulty: "Intermediate"
  },
  {
    id: 3,
    title: "The Stalker Protocol",
    description: "Analyze enemy movement to predict and survive longer.",
    content: "The Hunter AI is a simple stalker—it always moves toward your current position. To survive indefinitely, you must calculate the 'Manhattan Distance' between you and the enemy. If the distance is less than 3, prioritize evasion over fragment collection.",
    difficulty: "Advanced"
  }
];
