export interface Lesson {
  id: number;
  title: string;
  description: string;
  content: string;
  difficulty?: string;
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "The Digital Ocean",
    description: "Understanding the basics of AI survival in a connected world.",
    content: "The first rule of the AI Surfer is observation. Before you catch a wave, you must understand the current.",
    difficulty: "Beginner"
  },
  {
    id: 2,
    title: "Navigating the Wake",
    description: "How to maintain your identity while using neural networks.",
    content: "Your data is your fingerprint. In the wake of an AI, your fingerprint can be blurred or amplified.",
    difficulty: "Intermediate"
  },
  {
    id: 3,
    title: "The Surge",
    description: "Handling high-velocity information flows without wiping out.",
    content: "Information is like water; too much at once and you drown. Learn to filter the surge.",
    difficulty: "Advanced"
  }
];
