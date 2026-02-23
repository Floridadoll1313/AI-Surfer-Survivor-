import React from "react";
import Layout from "../components/Layout";
import "../components/Home.css";

const Sector3: React.FC = () => {
  return (
    <Layout>
      <div className="page-container">
        <section className="hero-section">
          <h1 className="hero-title">Sector 3: The Tideforge</h1>
          <p className="hero-subtitle">
            Where raw potential is shaped into mastery.
          </p>
        </section>

        <div className="portal-card">
          <h2 className="portal-title">Forge Your Power</h2>
          <p className="portal-text">
            The Tideforge is a crucible of creation. Here, survivors refine
            their abilities, crafting tools, insights, and strategies that carry
            them forward.
          </p>

          <button className="portal-button">Enter the Forge</button>
        </div>
      </div>
    </Layout>
  );
};

export default Sector3;
