import Layout from "../components/Layout";
import "../GlobalTheme.css";

function ShannonLore() {
  return (
    <Layout>
      {/* HERO */}
      <section className="hero">
        <h1 className="glow-title">The Lore of Ocean Tide Drop</h1>
        <p>
          The mythic origin of the tides, the founders, and the cosmic forces
          that shaped this universe.
        </p>
      </section>

      {/* WAVE DIVIDER */}
      <div className="wave-divider"></div>

      {/* LORE CONTENT */}
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
          The Awakening
        </h2>

        <p
          style={{
            opacity: 0.85,
            lineHeight: "1.7",
            marginBottom: "30px",
          }}
        >
          Before the tides had names and before the stars learned to shimmer,
          there was only the Deep Quiet — a vast, unshaped ocean of potential.
          It was here that Shannon felt the first pulse of creation, a rhythm
          echoing through the void like a heartbeat waiting to be born.
        </p>

        <p
          style={{
            opacity: 0.85,
            lineHeight: "1.7",
            marginBottom: "30px",
          }}
        >
          With intention and vision, she reached into the Deep Quiet and pulled
          forth the first wave — a luminous surge of aqua‑teal energy that
          cracked open the darkness and revealed the beginning of the cosmic
          tides. This wave became the foundation of all that followed.
        </p>

        <h2
          className="glow-title"
          style={{ fontSize: "2rem", margin: "40px 0 20px" }}
        >
          The Birth of the Founders
        </h2>

        <p
          style={{
            opacity: 0.85,
            lineHeight: "1.7",
            marginBottom: "30px",
          }}
        >
          From the first wave emerged three spirits — each shaped by a different
          aspect of the ocean’s power. Sailor Ann rose from the calm currents,
          Stormy Gray from the thunder tides, and Sky Marlin from the celestial
          reflections dancing across the water’s surface.
        </p>

        <p
          style={{
            opacity: 0.85,
            lineHeight: "1.7",
            marginBottom: "30px",
          }}
        >
          Together, they formed the Tri‑Tide — a balance of intuition, emotion,
          and cosmic insight. But it was Shannon who gave them purpose, guiding
          them as they shaped the mythic world that would become Ocean Tide
          Drop.
        </p>

        <h2
          className="glow-title"
          style={{ fontSize: "2rem", margin: "40px 0 20px" }}
        >
          The Eternal Flow
        </h2>

        <p
          style={{
            opacity: 0.85,
            lineHeight: "1.7",
            marginBottom: "30px",
          }}
        >
          The tides continue to evolve, shaped by creativity, resilience, and
          the unbreakable bond between the founders. Every wave carries a story.
          Every shimmer holds a memory. And every new creation adds another
          chapter to the mythos.
        </p>

        <a href="/" className="btn-glow">
          Return Home
        </a>
      </section>
    </Layout>
  );
}

export default ShannonLore;