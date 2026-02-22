import Layout from "../components/Layout";
import Hero from "../components/Hero";
import "../GlobalTheme.css";

function NotFound() {
  return (
    <Layout>
      <Hero
        title="Lost at Sea"
        subtitle="The page you’re searching for drifted beyond the tides."
        variant="deepsea"
      />

      <div className="wave-divider"></div>

      <section style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ opacity: 0.85, lineHeight: "1.7", marginBottom: "30px", fontSize: "1.2rem" }}>
          Even the greatest navigators lose their way sometimes.
        </p>

        <a href="/" className="btn-glow">Return to Shore</a>
      </section>
    </Layout>
  );
}

export default NotFound;