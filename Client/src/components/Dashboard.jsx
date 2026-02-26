import React from "react";
import AchievementBadge from "../components/AchievementBadge";
import { useProgression } from "../source/hooks/ProgressionContext";

export default function Dashboard() {
  const { xp, level, unlockedSectors } = useProgression();

  return (
    <div className="dashboard" data-reveal>
      <h1>Your Journey</h1>
      <p>Level: {level}</p>
      <p>XP: {xp}</p>

      <h2>Unlocked Sectors</h2>
      <ul>
        {unlockedSectors.map(s => (
          <li key={s}>Sector {s}</li>
        ))}
      </ul>

      <AchievementBadge />
    </div>
  );
}
