export interface Skill {
  id: string;
  name: string;
  description: string;
  cooldown: number; // in milliseconds
  duration?: number; // for active states like Phase or Flow
}

export const SKILLS: Record<string, Skill> = {
  runner: {
    id: 'dash',
    name: 'TACTICAL_DASH',
    description: 'Instantly burst 2 tiles forward.',
    cooldown: 3000,
  },
  ghost: {
    id: 'phase',
    name: 'PHASE_SHIFT',
    description: 'Become invulnerable to ☠ for 2 seconds.',
    cooldown: 8000,
    duration: 2000,
  },
  void: {
    id: 'singularity',
    name: 'GRAVITY_WELL',
    description: 'Vacuum nearby fragments to your location.',
    cooldown: 10000,
  },
  surfer: {
    id: 'flow',
    name: 'TIME_DILATION',
    description: 'Slow enemy movement by 50% for 4 seconds.',
    cooldown: 12000,
    duration: 4000,
  },
};
