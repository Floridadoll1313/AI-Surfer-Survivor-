import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import ScrollReveal from "../components/ScrollReveal";
import "../GlobalTheme.css";

function Home() {
  return (
    <Layout>
      <Hero
        title="Ocean Tide Drop"
        subtitle="A cinematic AI surfer universe — where myth, creativity, and cosmic tides shape every experience."
        variant="wave"
      />

      <div className="wave-divider"></div>

      <div className="card-grid">
        <ScrollReveal>
          <div className="card cosmic-border">
            <h2>Cosmic Worldbuilding</h2>
            <p>
              Dive into a universe shaped by tides, storms, and starlight — a
              mythic world crafted with intention and cinematic depth.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="card cosmic-border">
            <h2>Legendary Founders</h2>
            <p>
              Meet the spirits who guide the tides: Sailor Ann, Stormy Gray, Sky
              Marlin, and Shannon — the architect of it all.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="card cosmic-border">
            <h2>Aqua‑Teal Glow</h2>
            <p>
              A signature visual identity inspired by bioluminescent waters and
              cosmic energy — the heart of Ocean Tide Drop’s aesthetic.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </Layout>
  );
}

export default Home;