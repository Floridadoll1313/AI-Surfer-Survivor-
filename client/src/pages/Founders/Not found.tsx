import Layout from "../components/Layout";
import "../GlobalTheme.css";

function NotFound() {
  return (
    <Layout>
      {/* HERO */}
      <section className="hero">
        <h1 className="glow-title">Lost at Sea</h1>
        <p>
          The page you’re searching for drifted beyond the tides. But the ocean
          always guides those who listen.
        </p>
      </section>

      {/* WAVE DIVIDER */}
      <div className="wave-divider"></div>

      {/* CONTENT */}
      <section
        style={{
          padding: "40px 20px",
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <p
          style={{
            opacity: 0.85,
            lineHeight: "1.7",
            marginBottom: "30px",
            fontSize: "1.2rem",
          }}
        >
          You’ve wandered into uncharted waters — a place where forgotten waves
          echo and starlight bends in strange directions. But don’t worry. Even
          the greatest navigators lose their way sometimes.
        </p>

        <a href="/" className="btn-glow">
          Return to Shore
        </a>
      </section>
    </Layout>
  );
}

export default NotFound;