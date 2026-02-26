import React from "react";
import Layout from "../components/Layout";
import "../components/Home.css";

const Sector6: React.FC = () => {
  return (
    <Layout>
      <div className="page-container">
        <section className="hero-section">
          <h1 className="hero-title">Sector 6: The Challenge Arena</h1>
          <p className="hero-subtitle">
            Only those who face the storm rise above it.
          </p>
        </section>

        <div className="portal-card">
          <h2 className="portal-title">Face the Trials</h2>
          <p className="portal-text">
            The Arena tests your adaptability, creativity, and resilience. Each
            challenge pushes you closer to mastery.
          </p>

          <button className="portal-button">Begin Trial</button>
        </div>
      </div>
    </Layout>
  );
};

export default Sector6;
