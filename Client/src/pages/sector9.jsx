import React from "react";
import Layout from "../components/Layout";
import "../components/Home.css";

const Sector9: React.FC = () => {
  return (
    <Layout>
      <div className="page-container">
        <section className="hero-section">
          <h1 className="hero-title">Sector 9: The Vault of Storms</h1>
          <p className="hero-subtitle">
            Where chaos becomes clarity.
          </p>
        </section>

        <div className="portal-card">
          <h2 className="portal-title">Face the Tempest</h2>
          <p className="portal-text">
            The Vault is a crucible of intensity — a place where storms test the
            strength of your spirit and sharpen your resolve.
          </p>

          <button className="portal-button">Enter the Vault</button>
        </div>
      </div>
    </Layout>
  );
};

export default Sector9;
