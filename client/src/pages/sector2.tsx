import React from "react";
import Layout from "../components/Layout";
import "../components/Home.css";

const Sector2: React.FC = () => {
  return (
    <Layout>
      <div className="page-container">
        <section className="hero-section">
          <h1 className="hero-title">Sector 2: Training Grounds</h1>
          <p className="hero-subtitle">
            Strength is forged through repetition, clarity, and intention.
          </p>
        </section>

        <div className="portal-card">
          <h2 className="portal-title">Sharpen Your Skills</h2>
          <p className="portal-text">
            Here you learn the fundamentals — the core techniques that prepare
            you for the deeper sectors. Every survivor begins here.
          </p>

          <button className="portal-button">Enter Training</button>
        </div>
      </div>
    </Layout>
  );
};

export default Sector2;
