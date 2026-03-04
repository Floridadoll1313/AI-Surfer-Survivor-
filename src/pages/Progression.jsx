import React, { useState, useEffect } from "react";

export default function Progression() {
  const [xp, setXp] = useState(45); // current XP
  const [level, setLevel] = useState(3); // current level
  const [maxXp, setMaxXp] = useState(100); // XP needed for next level

  // Floating glow animation for level cards
  const floatingStyle = {
    animation: "float 6s ease-in-out infinite",
  };

  // XP bar width animation
  const xpPercent = (xp / maxXp) * 100;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Progression</h1>

      {/* LEVEL CARD */}
      <div style={{ ...styles.levelCard, ...floatingStyle }}>
        <h2 style={styles.levelLabel}>Current Level</h2>
        <div style={styles.levelNumber}>{level}</div>
      </div>

      {/* XP BAR */}
      <div style={styles.xpContainer}>
        <div style={styles.xpLabel}>XP: {xp} / {maxXp}</div>
        <div style={styles.xpBarOuter}>
          <div
            style={{
              ...styles.xpBarInner,
              width: `${xpPercent}%`,
            }}
          />
        </div>
      </div>

      {/* SECTOR GRID */}
      <h2 style={styles.sectionHeader}>Unlocked Sectors</h2>
      <div style={styles.grid}>
        {["Sector 1", "Sector 2", "Sector 3", "Sector 4"].map((sector, i) => (
          <div key={i} style={styles.gridItem}>
            {sector}
          </div>
        ))}
      </div>

      {/* CEREMONY TEASER */}
      <div style={styles.ceremonyBox}>
        <h3 style={styles.ceremonyTitle}>Next Rite Ceremony</h3>
        <p style={styles.ceremonyText}>
          A new transformation awaits. Prepare your spirit.
        </p>
        <div style={styles.ceremonyGlow}></div>
      </div>

      {/* KEYFRAME ANIMATIONS */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0px); }
          }

          @keyframes pulseGlow {
            0% { box-shadow: 0 0 10px #00eaff; }
            50% { box-shadow: 0 0 25px #00eaff; }
            100% { box-shadow: 0 0 10px #00eaff; }
          }

          @keyframes sweep {
            0% { opacity: 0; transform: translateX(-40px); }
            100% { opacity: 1; transform: translateX(0); }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    color: "white",
    fontFamily: "Orbitron, sans-serif",
    background: "linear-gradient(180deg, #00111a, #000814)",
    minHeight: "100vh",
  },

  title: {
    fontSize: "48px",
    textAlign: "center",
    marginBottom: "40px",
    color: "#00eaff",
    textShadow: "0 0 20px #00eaff",
    animation: "sweep 1.2s ease-out",
  },

  levelCard: {
    background: "rgba(0, 40, 60, 0.6)",
    border: "2px solid #00eaff",
    borderRadius: "12px",
    padding: "20px",
    width: "260px",
    margin: "0 auto 40px auto",
    textAlign: "center",
    boxShadow: "0 0 20px #00eaff",
  },

  levelLabel: {
    fontSize: "20px",
    marginBottom: "10px",
    color: "#7deaff",
  },

  levelNumber: {
    fontSize: "64px",
    fontWeight: "bold",
    color: "#00eaff",
    textShadow: "0 0 25px #00eaff",
  },

  xpContainer: {
    marginBottom: "40px",
    textAlign: "center",
  },

  xpLabel: {
    marginBottom: "10px",
    fontSize: "18px",
    color: "#7deaff",
  },

  xpBarOuter: {
    width: "80%",
    height: "20px",
    background: "#003344",
    borderRadius: "10px",
    margin: "0 auto",
    overflow: "hidden",
    border: "2px solid #00eaff",
  },

  xpBarInner: {
    height: "100%",
    background: "linear-gradient(90deg, #00eaff, #00bcd4)",
    transition: "width 1s ease-out",
  },

  sectionHeader: {
    fontSize: "28px",
    marginBottom: "20px",
    textAlign: "center",
    color: "#00eaff",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    width: "80%",
    margin: "0 auto 50px auto",
  },

  gridItem: {
    padding: "20px",
    background: "rgba(0, 40, 60, 0.5)",
    border: "2px solid #00eaff",
    borderRadius: "10px",
    textAlign: "center",
    fontSize: "20px",
    color: "#7deaff",
    animation: "pulseGlow 3s infinite",
  },

  ceremonyBox: {
    marginTop: "40px",
    padding: "30px",
    background: "rgba(0, 20, 30, 0.7)",
    borderRadius: "12px",
    border: "2px solid #00eaff",
    position: "relative",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },

  ceremonyTitle: {
    fontSize: "26px",
    marginBottom: "10px",
    color: "#00eaff",
  },

  ceremonyText: {
    fontSize: "18px",
    color: "#7deaff",
  },

  ceremonyGlow: {
    position: "absolute",
    top: "-10px",
    left: "-10px",
    right: "-10px",
    bottom: "-10px",
    borderRadius: "12px",
    boxShadow: "0 0 30px #00eaff",
    opacity: 0.3,
    animation: "pulseGlow 4s infinite",
  },
};
