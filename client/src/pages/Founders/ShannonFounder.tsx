import Layout from "../../components/Layout";
import Hero from "../../components/Hero";
import "../../GlobalTheme.css";

function ShannonFounder() {
  return (
    <Layout>
      <Hero
        title="Shannon"
        subtitle="The visionary creator — the one who awakened the universe and shaped the mythic tides."
        variant="deepsea"
      />

      <div className="wave-divider"></div>

      <section style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
        <h2 className="glow-title" style={{ fontSize: "2rem", marginBottom: "20px" }}>
          The Architect of the Cosmic Tide
        </h2>

        <p style={{ opacity: 0.85, lineHeight: "1.7", marginBottom: "30px" }}>
          Shannon is the origin point — the spark that ignited the mythic world
          of Ocean Tide Drop.
        </p>

        <a href="/founders" className="btn-glow">Back to Founders</a>
      </section>
    </Layout>
  );
}

export default ShannonFounder;