import React from "react";
import Layout from "../components/Layout";
import "../components/Home.css";

const Sector5: React.FC = () => {
  return (
    <Layout>
      <div className="page-container">
        <section className="hero-section">
          <h1 className="hero-title">Sector 5: The Deep Archives</h1>
          <p className="hero-subtitle">
            Knowledge preserved beneath the tides.
          </p>
        </section>

        <div className="portal-card">
          <h2 className="portal-title">Unlock the Records</h2>
          <p className="portal-text">
            The Deep Archives hold the stories, lessons, and discoveries of
            survivors who came before you. Their wisdom is your advantage.
          </p>

          <button className="portal-button">Enter the Archives</button>
        </div>
      </div>
    </Layout>
  );
};

export default Sector5;
