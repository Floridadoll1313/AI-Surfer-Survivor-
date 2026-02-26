import React from "react";
import Layout from "../components/Layout";
import "../components/Home.css";

const Sector1: React.FC = () => {
  return (
    <Layout>
      <div className="page-container">
        <section className="hero-section">
          <h1 className="hero-title">Sector 1: Arrival Beach</h1>
          <p className="hero-subtitle">
            Where every survivor first steps onto the island. The tide remembers
            your name.
          </p>
        </section>

        <div className="portal-card">
          <h2 className="portal-title">Welcome to the Shore</h2>
          <p className="portal-text">
            The ocean delivers those who are meant to rise. Here, you gather
            your bearings, learn the rhythm of the island, and prepare for the
            journey ahead.
          </p>

          <button className="portal-button">Begin Your Path</button>
        </div>
      </div>
    </Layout>
  );
};

export default Sector1;
