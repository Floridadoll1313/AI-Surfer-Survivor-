import Layout from "../components/Layout";
import "./Home.css";

function Home() {
  return (
    <Layout>
      <div className="home-hero">
        <div className="home-overlay" />

        <div className="home-content">
          <h1 className="home-title">Ocean Tide Drop</h1>
          <p className="home-subtitle">
            Where mythic waves, cosmic glow, and AI storytelling collide.
          </p>

          <div className="home-buttons">
            <a href="/founders" className="home-btn primary">
              Meet the Founders
            </a>
            <a href="/lore/shannon" className="home-btn secondary">
              Explore the Lore
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;