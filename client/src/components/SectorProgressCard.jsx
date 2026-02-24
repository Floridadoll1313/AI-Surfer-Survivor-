import React from "react";
import { Link } from "react-router-dom";
import { useProgression } from "../source/hooks/ProgressionContext";

export default function SectorProgressCard({ sector }) {
  const { unlockedSectors } = useProgression();

  const isUnlocked = unlockedSectors.includes(sector);

  return (
    <Link to={isUnlocked ? `/sector/${sector}` : "#"} style={{ textDecoration: "none" }}>
      <div className="sector-card" data-reveal>
        <h3 className="sector-title">Sector {sector}</h3>

        <p className="sector-status">
          {isUnlocked ? "Unlocked" : "Locked"}
        </p>

        {!isUnlocked && (
          <p className="sector-status" style={{ opacity: 0.7 }}>
            Progress to unlock this sector.
          </p>
        )}
      </div>
    </Link>
  );
}