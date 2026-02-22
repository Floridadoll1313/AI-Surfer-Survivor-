import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import "../GlobalTheme.css";

function FoundersPage() {
  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="hero">
        <h1 className="glow-title">The Founders</h1>
        <p>
          The legendary spirits who shaped the tides, guarded the storms, and
          forged the mythic world of Ocean Tide Drop.
        </p>
      </section>

      {/* WAVE DIVIDER */}
      <div className="wave-divider"></div>

      {/* FOUNDER CARDS */}
      <div className="card-grid">
        {/* SAILOR ANN */}
        <Link to="/founders/sailor-ann" className="card">
          <h2>Sailor Ann</h2>
          <p>
            The fearless navigator of cosmic waters. Her intuition guides the
            tides themselves.
          </p>
        </Link>

        {/* STORMY GRAY */}
        <Link to="/founders/stormy-gray" className="card">
          <h2>Stormy Gray</h2>
          <p>
            The storm‑bringer with a gentle heart. Chaos and calm move at her
            command.
          </p>
        </Link>

        {/* SKY MARLIN */}
        <Link to="/founders/sky-marlin" className="card">
          <h2>Sky Marlin</h2>
          <p>
            Guardian of the celestial waves. His presence bends starlight across
            the ocean.
          </p>
        </Link>

        {/* SHANNON */}
        <Link to="/founders/shannon" className="card">
          <h2>Shannon</h2>
          <p>
            The visionary creator. The one who awakened the universe and gave it
            purpose.
          </p>
        </Link>
      </div>
    </Layout>
  );
}

export default FoundersPage;