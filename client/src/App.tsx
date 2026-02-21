import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import FoundersPage from "./pages/Founders/FoundersPage";
import SailorAnn from "./pages/Founders/SailorAnn";
import StormyGray from "./pages/Founders/StormyGray";
import SkyMarlin from "./pages/Founders/SkyMarlin";

import ProductionBlueprint from "./pages/Blueprint/ProductionBlueprint";
import ProgressionPage from "./pages/Progression/ProgressionPage";

const App: React.FC = () => {
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

const styles: { [key: string]: React.CSSProperties } = {
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
    fontSize