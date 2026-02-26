export interface DailyMission {
  id: string;
  description: string;
  goal: number;
  reward: number;
}

const MISSIONS: DailyMission[] = [
  { id: 'collect_50', description: 'Harvest 50 Data Fragments in one run.', goal: 50, reward: 5000 },
  { id: 'combo_5', description: 'Reach a 5x Combo Multiplier.', goal: 5, reward: 3000 },
  { id: 'survive_3m', description: 'Stay connected to the Grid for 3 minutes.', goal: 180, reward: 4000 }
];

export const getDailyMission = () => {
  // Rotates mission based on the day of the year
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return MISSIONS[dayOfYear % MISSIONS.length];
};
