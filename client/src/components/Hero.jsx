import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero" data-reveal>
      {/* Left Side */}
      <div>
        <div className="hero-pill">Ocean Tide Drop</div>

        <h1 className="hero-main-title">
          Survive the Island.  
          <br />
          Master the AI.
        </h1>

        <p className="hero-subtitle">
          A cinematic, progression‑driven world where survival meets creation.
          Unlock sectors, earn XP, and shape your legend.
        </p>

        <div className="hero-cta-row">
          <Link to="/sector/1">
            <button className="hero-cta-primary">Begin Your Journey</button>
          </Link>

          <Link to="/lore">
            <button className="hero-cta-secondary">Read the Lore</button>
          </Link>
        </div>
      </div>

      {/* Right Side */}
      <div className="hero-orbit">
        <div className="hero-orbit-inner">
          <div className="hero-orbit-ring">
            <div className="hero-orbit-core"></div>
          </div>
        </div>
      </div>
    </section>
  );
}