import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import "../GlobalTheme.css";

function Home() {
  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="hero">
        <h1 className="glow-title">Ocean Tide Drop</h1>
        <p>
          A cinematic AI surfer universe — where myth, creativity, and cosmic
          tides shape every experience.
        </p>

        <div style={{ marginTop: "30px" }}>
          <Link to="/founders" className="btn-glow" style={{ marginRight: "15px" }}>
            Meet the Founders
          </Link>

          <Link to="/lore" className="btn-glow">
            Explore the Lore
          </Link>
        </div>
      </section>

      {/* WAVE DIVIDER */}
      <div className="wave-divider"></div>

      {/* FEATURE CARDS */}
      <div className="card-grid">
        <div className="card">
          <h2>Cosmic Worldbuilding</h2>
          <p>
            Dive into a universe shaped by tides, storms, and starlight — a
            mythic world crafted with intention and cinematic depth.
          </p>
        </div>

        <div className="card">
          <h2>Legendary Founders</h2>
          <p>
            Meet the spirits who guide the tides: Sailor Ann, Stormy Gray, Sky
            Marlin, and Shannon — the architect of it all.
          </p>
        </div>

        <div className="card">
          <h2>Aqua‑Teal Glow</h2>
          <p>
            A signature visual identity inspired by bioluminescent waters and
            cosmic energy — the heart of Ocean Tide Drop’s aesthetic.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Home;