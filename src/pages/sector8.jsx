import React from "react";
import Layout from "../components/Layout";
import "../components/Home.css";

const Sector8: React.FC = () => {
  return (
    <Layout>
      <div className="page-container">
        <section className="hero-section">
          <h1 className="hero-title">Sector 8: The Core</h1>
          <p className="hero-subtitle">
            The heart of the island pulses with ancient energy.
          </p>
        </section>

        <div className="portal-card">
          <h2 className="portal-title">Enter the Core</h2>
          <p className="portal-text">
            Here, the island reveals its true nature. Power, memory, and
            intention converge in a single point of truth.
          </p>

          <button className="portal-button">Approach the Core</button>
        </div>
      </div>
    </Layout>
  );
};

export default Sector8;
