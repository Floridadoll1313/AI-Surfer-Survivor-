// src/pages/Community.jsx
import React from "react";
import Layout from "../components/Layout";
import "./Community.css";

export default function Community() {
  return (
    <Layout>
      <div className="community-container">

        {/* HERO */}
        <section className="community-hero">
          <div className="community-hero-overlay" />
          <h1 className="community-title">The Community Tide</h1>
          <p className="community-subtitle">
            Where survivors gather, stories ignite, and the Realm breathes as one.
          </p>
        </section>

        {/* PILLARS */}
        <section className="pillars-section">
          <h2 className="section-title">The Three Pillars</h2>
          <div className="pillars-grid">
            <div className="pillar-card">
              <h3>Flow</h3>
              <p>Daily rituals, grounding practices, and the rhythm of your journey.</p>
            </div>
            <div className="pillar-card">
              <h3>Forge</h3>
              <p>Skill mastery, creative fire, and leveling up through challenge.</p>
            </div>
            <div className="pillar-card">
              <h3>Depth</h3>
              <p>Reflection, meaning-making, and the mythic layers beneath the tide.</p>
            </div>
          </div>
        </section>

        {/* CAMPFIRE STORIES */}
        <section className="campfire-section">
          <h2 className="section-title">Campfire Stories</h2>
          <p className="campfire-desc">
            Tales shared under the glowing tide — victories, lessons, and the sparks that keep us moving.
          </p>

          <div className="campfire-stories">
            <div className="story-card">
              <h4>🔥 Rising From the Undertow</h4>
              <p>A survivor recounts the moment they reclaimed their voice after the storm.</p>
            </div>

            <div className="story-card">
              <h4>🔥 The First Light</h4>
              <p>A tale of finding unexpected allies in the darkest waters.</p>
            </div>

            <div className="story-card">
              <h4>🔥 Driftwood Lessons</h4>
              <p>What the tide washes away… and what it returns transformed.</p>
            </div>
          </div>
        </section>

        {/* LIVE FEED */}
        <section className="feed-section">
          <h2 className="section-title">Live Tribe Feed</h2>
          <p className="feed-desc">Signals from across the Realm — footsteps, wins, and waves.</p>

          <div className="feed-grid">
            <div className="feed-item">🌊 @Kai completed a 3‑day ritual streak</div>
            <div className="feed-item">🔥 @Mira forged a new skill: Shadow Mapping</div>
            <div className="feed-item">🌙 @Rowan shared a Depth reflection</div>
            <div className="feed-item">⚔️ @Ash entered the Arena for the first time</div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
