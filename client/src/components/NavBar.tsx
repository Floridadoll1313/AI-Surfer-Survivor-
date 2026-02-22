import { Link } from "react-router-dom";
import "../GlobalTheme.css";

function NavBar() {
  return (
    <nav
      style={{
        width: "100%",
        padding: "20px 25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "var(--bg-darker)",
        borderBottom: "1px solid rgba(0, 255, 213, 0.2)",
        boxShadow: "0 4px 20px rgba(0, 255, 213, 0.15)",
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      {/* LOGO */}
      <Link
        to="/"
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "var(--glow-primary)",
          textShadow: "0 0 12px var(--glow-primary)",
          textDecoration: "none",
        }}
      >
        OTD
      </Link>

      {/* LINKS */}
      <div style={{ display: "flex", gap: "20px" }}>
        <Link className="nav-link" to="/founders">
          Founders
        </Link>
        <Link className="nav-link" to="/lore">
          Lore
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;