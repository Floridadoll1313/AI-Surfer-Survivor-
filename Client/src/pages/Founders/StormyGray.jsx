import Layout from "../../components/Layout";
import Hero from "../../components/Hero";
import ScrollReveal from "../../components/ScrollReveal";
import "../../GlobalTheme.css";

function StormyGray() {
  return (
    <Layout>
      <Hero
        title="Stormy Gray"
        subtitle="The storm‑bringer with a gentle heart — master of thunder tides and guardian of balance."
        variant="storm"
      />

      <div className="wave-divider"></div>

      <section style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
        <ScrollReveal>
          <h2 className="glow-title" style={{ fontSize: "2rem", marginBottom: "20px" }}>
            The Keeper of Tempests
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <p style={{ opacity: 0.85, lineHeight: "1.7", marginBottom: "30px" }}>
            Stormy Gray is the pulse of the storm — the founder who commands the
            raw, electric energy of the ocean’s wildest moods.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <a href="/founders" className="btn-glow">Back to Founders</a>
        </ScrollReveal>
      </section>
    </Layout>
  );
}

export default StormyGray;
