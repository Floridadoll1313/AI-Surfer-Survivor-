import Layout from "../../components/Layout";
import Hero from "../../components/Hero";
import ScrollReveal from "../../components/ScrollReveal";
import "../../GlobalTheme.css";

function SkyMarlin() {
  return (
    <Layout>
      <Hero
        title="Sky Marlin"
        subtitle="Guardian of the celestial waves — bending starlight across the ocean."
        variant="cosmic"
      />

      <div className="wave-divider"></div>

      <section style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
        <ScrollReveal>
          <h2 className="glow-title" style={{ fontSize: "2rem", marginBottom: "20px" }}>
            The Celestial Guardian
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <p style={{ opacity: 0.85, lineHeight: "1.7", marginBottom: "30px" }}>
            Sky Marlin is the silent sentinel of the cosmic tides — bridging the
            ocean and the stars.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <a href="/founders" className="btn-glow">Back to Founders</a>
        </ScrollReveal>
      </section>
    </Layout>
  );
}

export default SkyMarlin;
