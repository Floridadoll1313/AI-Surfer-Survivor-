import React from "react";

export default function ThirdPartyTools() {
  return (
    <div className="third-party-tools-page" style={styles.page}>
      <h1 style={styles.title}>Third‑Party Tools</h1>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Instagram Embed</h2>

        <instagram-post
          post-url="https://www.instagram.com/p/C3Sk6d2MTjI/"
          captions="true"
        ></instagram-post>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>More Integrations Coming Soon</h2>
        <p style={styles.text}>
          This page will host all external embeds powered by Zaraz — TikTok,
          YouTube, Calendly, analytics widgets, and more.
        </p>
      </section>
    </div>
  );
}

const styles = {
  page: {
    padding: "40px",
    color: "#e0f7ff",
    background: "linear-gradient(180deg, #001f2e, #00384d)",
    minHeight: "100vh",
  },
  title: {
    fontSize: "2.8rem",
    marginBottom: "30px",
    textShadow: "0 0 12px #00eaff",
  },
  section: {
    marginBottom: "50px",
    padding: "20px",
    background: "rgba(0, 40, 60, 0.4)",
    borderRadius: "12px",
    border: "1px solid rgba(0, 255, 255, 0.2)",
  },
  sectionTitle: {
    fontSize: "1.8rem",
    marginBottom: "15px",
    textShadow: "0 0 8px #00eaff",
  },
  text: {
    fontSize: "1.1rem",
    lineHeight: "1.6",
  },
};
