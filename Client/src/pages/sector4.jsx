import React from "react";
import Layout from "../components/Layout";
import "../components/Home.css";

const Sector4: React.FC = () => {
  return (
    <Layout>
      <div className="page-container">
        <section className="hero-section">
          <h1 className="hero-title">Sector 4: The Observatory</h1>
          <p className="hero-subtitle">
            Vision expands when you rise above the waves.
          </p>
        </section>

        <div className="portal-card">
          <h2 className="portal-title">See the Island Clearly</h2>
          <p className="portal-text">
            The Observatory reveals patterns, connections, and insights hidden
            from ground level. This is where strategy begins.
          </p>

          <button className="portal-button">Ascend</button>
        </div>
      </div>
    </Layout>
  );
};

export default Sector4;
