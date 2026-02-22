
`tsx
import AnimatedLogo from "./AnimatedLogo";
import "../GlobalTheme.css";

function LoadingScreen() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "var(--bg-dark)",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <AnimatedLogo />

      <div
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          border: "4px solid rgba(0,255,213,0.3)",
          borderTopColor: "var(--glow-primary)",
          animation: "spin 1.2s linear infinite",
        }}
      ></div>
    </div>
  );
}

export default LoadingScreen;
`