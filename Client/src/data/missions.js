export interface Mission {
  id: string;
  description: string;
  goalType: 'score' | 'no_shield' | 'combo' | 'survival';
  target: number;
  reward: number;
}

export const missionPool: Mission[] = [
  { id: 'm1', description: 'Achieve 2,500 points in one run', goalType: 'score', target: 2500, reward: 1000 },
  { id: 'm2', description: 'Reach 1,000 points without using a shield', goalType: 'no_shield', target: 1000, reward: 1500 },
  { id: 'm3', description: 'Maintain a x5 combo for 30 seconds', goalType: 'combo', target: 5, reward: 1200 },
  { id: 'm4', description: 'Survive for 2 minutes straight', goalType: 'survival', target: 120, reward: 800 },
];

export const getDailyMission = () => {
  const day = new Date().getDate(); // 1-31
  return missionPool[day % missionPool.length];
};
