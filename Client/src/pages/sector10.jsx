import React from "react";
import Layout from "../components/Layout";
import "../components/Home.css";

const Sector10: React.FC = () => {
  return (
    <Layout>
      <div className="page-container">
        <section className="hero-section">
          <h1 className="hero-title">Sector 10: The Final Ascent</h1>
          <p className="hero-subtitle">
            The summit awaits those who endure.
          </p>
        </section>

        <div className="portal-card">
          <h2 className="portal-title">Rise</h2>
          <p className="portal-text">
            The Final Ascent is the culmination of your journey — the moment
            where everything you’ve learned converges into transformation.
          </p>

          <button className="portal-button">Ascend</button>
        </div>
      </div>
    </Layout>
  );
};

export default Sector10;
