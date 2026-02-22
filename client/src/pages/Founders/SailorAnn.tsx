import Layout from "../../components/Layout";
import "../../GlobalTheme.css";

function SailorAnn() {
  return (
    <Layout>
      {/* HERO */}
      <section className="hero">
        <h1 className="glow-title">Sailor Ann</h1>
        <p>
          The fearless navigator of cosmic waters — first to chart the tides
          where starlight meets the deep.
        </p>
      </section>

      {/* WAVE DIVIDER */}
      <div className="wave-divider"></div>

      {/* PROFILE CONTENT */}
      <section style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
        <h2 className="glow-title" style={{ fontSize: "2rem", marginBottom: "20px" }}>
          The Navigator of the Infinite Tides
        </h2>

        <p style={{ opacity: 0.85, lineHeight: "1.7", marginBottom: "30px" }}>
          Sailor Ann is the first founder — the one who sensed the pulse of the
          ocean long before the universe had a name. Her instincts are legendary.
          She can read the tides the way others read the sky, feeling the subtle
          shifts in cosmic currents that guide travelers safely through the
          unknown.
        </p>

        <p style={{ opacity: 0.85, lineHeight: "1.7", marginBottom: "30px" }}>
          Where others see chaos, she sees patterns. Where others fear the dark,
          she finds direction. Her presence is calm, steady, and unshakable —
          the lighthouse spirit of Ocean Tide Drop.
        </p>

        <a href="/founders" className="btn-glow">
          Back to Founders
        </a>
      </section>
    </Layout>
  );
}

export default SailorAnn;