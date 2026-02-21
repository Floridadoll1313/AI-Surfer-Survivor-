import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import FoundersPage from "./pages/Founders/FoundersPage";
import SailorAnn from "./pages/Founders/SailorAnn";
import StormyGray from "./pages/Founders/StormyGray";
import SkyMarlin from "./pages/Founders/SkyMarlin";

import ProductionBlueprint from "./pages/Blueprint/ProductionBlueprint";
import ProgressionPage from "./pages/Progression/ProgressionPage";

const App = () => {
  return (
    <Router>
      <div style={styles.app}>
        <header style={styles.header}>
          <div style={styles.logoArea}>
            <span style={styles.logoText}>Ocean Tide Drop</span>
            <span style={styles.logoSub}>AI Surfer Survivor</span>
          </div>
          <nav style={styles.nav}>
            <Link to="/" style={styles.navLink}>
              Home
            </Link>
            <Link to="/founders" style={styles.navLink}>
              Founders
            </Link>
            <Link to="/blueprint" style={styles.navLink}>
              Production Blueprint
            </Link>
            <Link to="/progression" style={styles.navLink}>
              Progression
            </Link>
          </nav>
        </header>

        <main style={styles.main}>
          <Routes>
            <Route
              path="/"
              element={
                <div style={styles.home}>
                  <h1 style={styles.homeTitle}>Welcome to Ocean Tide Drop</h1>
                  <p style={styles.homeText}>
                    A survivor’s universe built from miles on the road, three loyal
                    dogs, and a futuristic island of neon, wood, and waves.
                  </p>
                  <div style={styles.homeButtons}>
                    <Link to="/founders" style={styles.primaryButton}>
                      Meet the Founders
                    </Link>
                    <Link to="/blueprint" style={styles.secondaryButton}>
                      View the Production Blueprint
                    </Link>
                  </div>
                </div>
              }
            />

            {/* Founders */}
            <Route path="/founders" element={<FoundersPage />} />
            <Route path="/founders/sailor-ann" element={<SailorAnn />} />
            <Route path="/founders/stormy-gray" element={<StormyGray />} />
            <Route path="/founders/sky-marlin" element={<SkyMarlin />} />

            {/* Blueprint & Progression */}
            <Route path="/blueprint" element={<ProductionBlueprint />} />
            <Route path="/progression" element={<ProgressionPage />} />
          </Routes>
        </main>

        <footer style={styles.footer}>
          <p>&copy; 2026 Ocean Tide Drop • AI Surfer Survivor</p>
        </footer>
      </div>
    </Router>
  );
};

const styles = {
  app: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#05070b",
    color: "#f5f5f5",
    fontFamily: "Segoe UI, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    borderBottom: "1px solid #111827",
    background:
      "linear-gradient(90deg, rgba(0,242,255,0.12), rgba(255,140,0,0.08))",
    position: "sticky",
    top: 0,
    zIndex: 20,
    backdropFilter: "blur(10px)",
  },
  logoArea: {
    display: "flex",
    flexDirection: "column",
  },
  logoText: {
    fontSize: "1.3rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  logoSub: {
    fontSize: "0.8rem",
    color: "#9ca3af",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
  },
  nav: {
    display: "flex",
    gap: "18px",
    alignItems: "center",
  },
  navLink: {
    color: "#e5e7eb",
    textDecoration: "none",
    fontSize: "0.95rem",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    padding: "6px 10px",
    borderRadius: "999px",
    border: "1px solid transparent",
    transition: "all 0.18s ease-out",
  },
  main: {
    flex: 1,
    padding: "30px 20px 40px",
  },
  footer: {
    padding: "20px",
    textAlign: "center",
    fontSize: "0.8rem",
    color: "#6b7280",
    borderTop: "1px solid #111827",
  },
  home: {
    maxWidth: "900px",
    margin: "40px auto 0",
    textAlign: "center",
  },
  homeTitle: {
    fontSize: "2.8rem",
    marginBottom: "15px",
    textShadow: "0 0 18px rgba(0,242,255,0.4)",
  },
  homeText: {
    fontSize: "1.1rem",
    color: "#d1d5db",
    marginBottom: "30px",
  },
  homeButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    flexWrap: "wrap",
  },
  primaryButton: {
    padding: "10px 22px",
    borderRadius: "999px",
    background:
      "radial-gradient(circle at top, #00f2ff, #0284c7 55%, #0f172a)",
    color: "#f9fafb",
    textDecoration: "none",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontSize: "0.9rem",
    boxShadow: "0 0 18px rgba(0,242,255,0.5)",
  },
  secondaryButton: {
    padding: "10px 22px",
    borderRadius: "999px",
    border: "1px solid #4b5563",
    color: "#e5e7eb",
    textDecoration: "none",
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontSize: "0.9rem",
  },
};

export default App;