import "../GlobalTheme.css";

function AnimatedLogo() {
  return (
    <div
      style={{
        fontSize: "2.4rem",
        fontWeight: 800,
        color: "var(--glow-primary)",
        textShadow:
          "0 0 12px var(--glow-primary), 0 0 24px var(--glow-primary)",
        animation: "pulseGlow 3s infinite ease-in-out",
      }}
    >
      OTD
    </div>
  );
}

export default AnimatedLogo;