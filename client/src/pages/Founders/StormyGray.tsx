import Layout from "../../components/Layout";
import "../../GlobalTheme.css";

function StormyGray() {
  return (
    <Layout>
      {/* HERO */}
      <section className="hero">
        <h1 className="glow-title">Stormy Gray</h1>
        <p>
          The storm‑bringer with a gentle heart — master of thunder tides and
          guardian of balance between chaos and calm.
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
          The Keeper of Tempests
        </h2>

        <p
          style={{
            opacity: 0.85,
            lineHeight: "1.7",
            marginBottom: "30px",
          }}
        >
          Stormy Gray is the pulse of the storm — the founder who commands the
          raw, electric energy of the ocean’s wildest moods. Her presence is a
          paradox: fierce yet nurturing, unpredictable yet deeply protective.
        </p>

        <p
          style={{
            opacity: 0.85,
            lineHeight: "1.7",
            marginBottom: "30px",
          }}
        >
          When the tides rage and lightning splits the sky, it is Stormy Gray
          who stands at the center, shaping the chaos into harmony. She is the
          emotional core of the founders — the one who feels deeply, loves
          fiercely, and protects without hesitation.
        </p>

        <a href="/founders" className="btn-glow">
          Back to Founders
        </a>
      </section>
    </Layout>
  );
}

export default StormyGray;