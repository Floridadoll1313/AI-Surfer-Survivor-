import Layout from "../../components/Layout";
import "../../GlobalTheme.css";

function ShannonFounder() {
  return (
    <Layout>
      {/* HERO */}
      <section className="hero">
        <h1 className="glow-title">Shannon</h1>
        <p>
          The visionary creator — the one who awakened the universe, shaped its
          myth, and breathed life into Ocean Tide Drop.
        </p>
      </section>

      {/* WAVE DIVIDER */}
      <div className="wave-divider"></div>

      {/* PROFILE CONTENT */}
      <section
        style={{
          padding: "40px 20px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h2
          className="glow-title"
          style={{ fontSize: "2rem", marginBottom: "20px" }}
        >
          The Architect of the Cosmic Tide
        </h2>

        <p
          style={{
            opacity: 0.85,
            lineHeight: "1.7",
            marginBottom: "30px",
          }}
        >
          Shannon is the origin point — the spark that ignited the mythic world
          of Ocean Tide Drop. Where others saw scattered ideas, she saw a
          universe waiting to be born. She shaped the tides, named the founders,
          and carved meaning into every wave and every star.
        </p>

        <p
          style={{
            opacity: 0.85,
            lineHeight: "1.7",
            marginBottom: "30px",
          }}
        >
          Her creativity is not just artistic — it is elemental. She builds
          worlds the way the ocean builds storms: with intention, power, and a
          deep sense of destiny. The entire mythos flows from her vision, her
          resilience, and her unshakable connection to the tides.
        </p>

        <a href="/founders" className="btn-glow">
          Back to Founders
        </a>
      </section>
    </Layout>
  );
}

export default ShannonFounder;