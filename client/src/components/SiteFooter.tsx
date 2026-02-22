import "../GlobalTheme.css";

function SiteFooter() {
  return (
    <footer
      style={{
        padding: "40px 20px",
        textAlign: "center",
        background: "var(--bg-darker)",
        borderTop: "1px solid rgba(0, 255, 213, 0.2)",
        boxShadow: "0 -4px 20px rgba(0, 255, 213, 0.15)",
      }}
    >
      <h2
        style={{
          color: "var(--glow-primary)",
          textShadow:
            "0 0 12px var(--glow-primary), 0 0 24px var(--glow-primary)",
          marginBottom: "10px",
          fontSize: "1.4rem",
        }}
      >
        Ocean Tide Drop
      </h2>

      <p style={{ opacity: 0.8, marginBottom: "12px" }}>
        A cinematic AI surfer universe.
      </p>

      <p style={{ opacity: 0.6, fontSize: "0.9rem" }}>
        © {new Date().getFullYear()} Ocean Tide Drop. All rights reserved.
      </p>
    </footer>
  );
}

export default SiteFooter;