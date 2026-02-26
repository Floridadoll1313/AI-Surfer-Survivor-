import Layout from "../components/Layout";
import Hero from "../components/Hero";
import ScrollReveal from "../components/ScrollReveal";
import "../GlobalTheme.css";

function ShannonLore() {
  return (
    <Layout>
      <Hero
        title="The Lore of Ocean Tide Drop"
        subtitle="The mythic origin of the tides, founders, and cosmic forces."
        variant="cosmic"
      />

      <div className="wave-divider"></div>

      <section style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
        <ScrollReveal>
          <h2 className="glow-title" style={{ fontSize: "2rem", marginBottom: "20px" }}>
            The Awakening
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <p style={{ opacity: 0.85, lineHeight: "1.7", marginBottom: "30px" }}>
            Before the tides had names, there was only the Deep Quiet.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <a href="/" className="btn-glow">Return Home</a>
        </ScrollReveal>
      </section>
    </Layout>
  );
}

export default ShannonLore;
