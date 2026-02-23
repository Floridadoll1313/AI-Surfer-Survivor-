import React from "react";
import Layout from "../components/Layout";
import LoreCard from "../components/lore/LoreCard";
import loreData from "../data/loreData";
import "../styles/animations.css";

const Lore: React.FC = () => {
  return (
    <Layout>
      <div className="page-container fade-in">
        <section className="hero-section">
          <h1 className="hero-title glow-pulse">Lore Archive</h1>
          <p className="hero-subtitle">
            The island remembers everything. These are its stories.
          </p>
        </section>

        <div className="lore-grid">
          {loreData.map((entry) => (
            <LoreCard key={entry.id} entry={entry} />
          ))}
        </div>

        <style jsx>{`
          .lore-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default Lore;
