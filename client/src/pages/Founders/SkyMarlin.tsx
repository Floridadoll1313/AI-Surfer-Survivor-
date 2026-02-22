import Layout from "../../components/Layout";
import "../../GlobalTheme.css";

function SkyMarlin() {
  return (
    <Layout>
      {/* HERO */}
      <section className="hero">
        <h1 className="glow-title">Sky Marlin</h1>
        <p>
          Guardian of the celestial waves — the founder who bends starlight
          across the ocean and watches over the tides from above.
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
          The Celestial Guardian
        </h2>

        <p
          style={{
            opacity: 0.85,
            lineHeight: "1.7",
            marginBottom: "30px",
          }}
        >
          Sky Marlin is the silent sentinel of the cosmic tides — the founder
          whose presence bridges the ocean and the stars. He is calm, wise, and
          impossibly observant, seeing patterns in the universe that others
          overlook.
        </p>

        <p
          style={{
            opacity: 0.85,
            lineHeight: "1.7",
            marginBottom: "30px",
          }}
        >
          When the night sky reflects across the water, it is Sky Marlin who
          shapes the glow. He guides travelers not by force, but by illumination
          — revealing the path forward with quiet brilliance.
        </p>

        <a href="/founders" className="btn-glow">
          Back to Founders
        </a>
      </section>
    </Layout>
  );
}

export default SkyMarlin;