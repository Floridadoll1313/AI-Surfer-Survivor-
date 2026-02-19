import React from "react";
import Layout from "../layout/Layout";
import "./home.css";

export default function Home() {
  return (
    <Layout>
      <div className="home-hero">
        <h1 className="home-title">Welcome to Ocean Tide Drop</h1>
        <p className="home-subtitle">
          Your AI‑Surfer Survivor journey begins here.
        </p>
      </div>

      <section className="home-section">
        <h2 className="section-title">Choose Your Path</h2>
        <div className="card-grid">
          <a href="/island" className="home-card">
            <h3>🏝 Island</h3>
            <p>Explore the world, unlock skills, and level up.</p>
          </a>

          <a href="/challenges" className="home-card">
            <h3>🔥 Challenges</h3>
            <p>Daily tasks that sharpen your AI instincts.</p>
          </a>

          <a href="/progression" className="home-card">
            <h3>📈 Progression</h3>
            <p>Track your growth across all skill domains.</p>
          </a>

          <a href="/community" className="home-card">
            <h3>🌐 Community</h3>
            <p>Connect with other survivors around the fire.</p>
          </a>
        </div>
      </section>
    </Layout>
  );
}
