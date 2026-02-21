import React from "react";
import { Link } from "react-router-dom";
import { theme } from "../theme";

const FoundersNav: React.FC = () => {
  return (
    <nav style={styles.nav}>
      <Link to="/founders" style={styles.link}>
        ← Back to Founders
      </Link>
      <div style={styles.row}>
        <Link to="/founders/sailor-ann" style={styles.link}>
          Sailor Ann
        </Link>
        <Link to="/founders/stormy-gray" style={styles.link}>
          Stormy Gray
        </Link>
        <Link to="/founders/sky-marlin" style={styles.link}>
          Sky Marlin
        </Link>
      </div>
    </nav>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "30px",
    padding: "15px 20px",
    borderRadius: "14px",
    background: theme.colors.panel,
    border: `1px solid ${theme.colors.oceanDim}`,
    boxShadow: theme.shadows.glow,
  },
  row: {
    display: "flex",
    gap: "18px",
    flexWrap: "wrap",
  },
  link: {
    color: theme.colors.text,
    textDecoration: "none",
    fontSize: "1rem",
    padding: "6px 12px",
    borderRadius: "8px",
    border: `1px solid ${theme.colors.oceanDim}`,
    background: "rgba(0, 234, 255, 0.08)",
    transition: "0.2s",
  },
};

export default FoundersNav;
