// src/pages/Blog.jsx
import React from "react";
import Layout from "../components/Layout";
import "./Blog.css";

export default function Blog() {
  return (
    <Layout>
      <div className="blog-container">

        {/* HERO */}
        <section className="blog-hero">
          <div className="blog-hero-overlay" />
          <h1 className="blog-title">The Tide Journal</h1>
          <p className="blog-subtitle">
            Reflections, transmissions, and stories carried by the Ocean of the Realm.
          </p>
        </section>

        {/* FEATURED POST */}
        <section className="featured-section">
          <h2 className="section-title">Featured Chronicle</h2>

          <div className="featured-card">
            <div className="featured-content">
              <h3>The Day the Tide Shifted</h3>
              <p>
                A deep dive into the moment the Realm awakened — when survivors first
                felt the pulse beneath the waves and the Island began to reshape itself.
              </p>
              <button className="read-more-btn">Read More</button>
            </div>
          </div>
        </section>

        {/* BLOG GRID */}
        <section className="blog-grid-section">
          <h2 className="section-title">Latest Entries</h2>

          <div className="blog-grid">

            <div className="blog-card">
              <h4>🌊 Mapping the Inner Shoreline</h4>
              <p>
                Understanding the emotional tides that shape your journey through the Realm.
              </p>
              <button className="card-btn">Open Entry</button>
            </div>

            <div className="blog-card">
              <h4>🔥 The Forge Within</h4>
              <p>
                How challenge, pressure, and resilience create the strongest versions of us.
              </p>
              <button className="card-btn">Open Entry</button>
            </div>

            <div className="blog-card">
              <h4>🌙 Depth Calls Back</h4>
              <p>
                A reflection on the quiet places — where intuition and myth intertwine.
              </p>
              <button className="card-btn">Open Entry</button>
            </div>

            <div className="blog-card">
              <h4>⚔️ Arena Lessons</h4>
              <p>
                What the Arena teaches us about courage, failure, and rising again.
              </p>
              <button className="card-btn">Open Entry</button>
            </div>

          </div>
        </section>

      </div>
    </Layout>
  );
}
