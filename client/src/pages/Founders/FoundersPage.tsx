import Layout from "../components/Layout";
import Hero from "../components/Hero";
import "../GlobalTheme.css";

function FoundersPage() {
  return (
    <Layout>
      <Hero
        title="The Founders"
        subtitle="The spirits who shaped the tides, storms, and cosmic flow of Ocean Tide Drop."
        variant="wave"
      />

      <div className="wave-divider"></div>

      <div className="card-grid">
        <a href="/founders/sailor-ann" className="card">
          <h2>Sailor Ann</h2>
          <p>The Navigator of Infinite Tides.</p>
        </a>

        <a href="/founders/stormy-gray" className="card">
          <h2>Stormy Gray</h2>
          <p>The Keeper of Tempests.</p>
        </a>

        <a href="/founders/sky-marlin" className="card">
          <h2>Sky Marlin</h2>
          <p>The Celestial Guardian.</p>
        </a>

        <a href="/founders/shannon" className="card">
          <h2>Shannon</h2>
          <p>The Architect of the Cosmic Tide.</p>
        </a>
      </div>
    </Layout>
  );
}

export default FoundersPage;