
`tsx
import "../GlobalTheme.css";

function SiteFooter() {
  return (
    <footer
      style={{
        padding: "40px 20px",
        textAlign: "center",
        background: "var(--bg-darker)",
        borderTop: "1px solid rgba(0,255,213,0.2)",
        boxShadow: "0 -4px 20px rgba(0,255,213,0.15)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontSize: "1.2rem",
          opacity: 0.8,
          marginBottom: "10px",
        }}
      >
        © {new Date().getFullYear()} Ocean Tide Drop
      </div>

      <div
        style={{
          fontSize: "0.9rem",
          opacity: 0.6,
        }}
      >
        Crafted with cosmic tides and glowing creativity.
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 120%, rgba(0,255,213,0.15), transparent 70%)",
          animation: "footerGlow 8s ease-in-out infinite",
          pointerEvents: "none",
        }}
      ></div>
    </footer>
  );
}

export default SiteFooter;
`
