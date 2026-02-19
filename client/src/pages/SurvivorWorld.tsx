import { SKILLS } from '../data/skills';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const currentSkill = SKILLS[selectedAvatar]; // This pulls the specific skill for your character

  // Use currentSkill.cooldown for your timer logic
  // Use currentSkill.name for your SYSLOG alerts
}
