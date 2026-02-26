export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  category: 'Basics' | 'Survival' | 'Tech' | 'Advanced';
}

export const lessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Introduction to AI Surfer Survival',
    description: 'Master the basics of the Maritime Arena and biometric integration.',
    category: 'Basics',
    content: 'Welcome to the island. Your first task is to synchronize your biometric band with the Mother Ship...'
  },
  {
    id: 'lesson-2',
    title: 'Holographic Navigation',
    description: 'Learn to use handheld scanners for night missions.',
    category: 'Tech',
    content: 'When the sun sets, the jungle changes. Use your cone of blue light to identify hidden resource markers...'
  }
];
