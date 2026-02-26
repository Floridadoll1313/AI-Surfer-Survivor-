import Layout from "../../components/Layout";
import Hero from "../../components/Hero";
import ScrollReveal from "../../components/ScrollReveal";
import "../../GlobalTheme.css";

function SailorAnn() {
  return (
    <Layout>
      <Hero
        title="Sailor Ann"
        subtitle="The fearless navigator of cosmic waters — first to chart the tides where starlight meets the deep."
        variant="wave"
      />

      <div className="wave-divider"></div>

      <section style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
        <ScrollReveal>
          <h2 className="glow-title" style={{ fontSize: "2rem", marginBottom: "20px" }}>
            The Navigator of the Infinite Tides
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <p style={{ opacity: 0.85, lineHeight: "1.7", marginBottom: "30px" }}>
            Sailor Ann is the first founder — the one who sensed the pulse of the
            ocean long before the universe had a name.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <a href="/founders" className="btn-glow">Back to Founders</a>
        </ScrollReveal>
      </section>
    </Layout>
  );
}

export default SailorAnn;
