import React from "react";

export default function AchievementBadge() {
  return (
    <div
      className="achievement-badge"
      data-reveal
      style={{
        marginTop: "1.5rem",
        padding: "1rem",
        borderRadius: "1rem",
        background: "rgba(15, 23, 42, 0.9)",
        border: "1px solid rgba(148, 163, 184, 0.35)",
        textAlign: "center",
      }}
    >
      <h3 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>
        Achievement Unlocked
      </h3>
      <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>
        Your journey has begun. More badges will appear as you progress.
      </p>
    </div>
  );
}