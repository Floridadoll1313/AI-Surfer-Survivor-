import React from "react";

const SailorAnn: React.FC = () => {
  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Sailor Ann</h1>
        <p style={styles.role}>The Gentle Heart</p>
      </div>

      <div style={styles.imageRow}>
        <img
          src="/20260220_130443.jpg"
          alt="Sailor Ann sitting"
          style={styles.image}
        />
        <img
          src="/20260220_130536.jpg"
          alt="Sailor Ann resting"
          style={styles.image}
        />
      </div>

      <div style={styles.textBlock}>
        <p style={styles.text}>
          <strong>Sailor Ann</strong> is the quiet soul of the family — steady,
          soft, and full of wisdom earned from miles on the road. She doesn’t
          rush. She doesn’t push. She simply walks at her own pace, and we follow
          her lead.
        </p>

        <p style={styles.text}>
          When life forced us into the woods, into parking lots, into long days
          of walking with everything we owned in a cart, Sailor Ann reminded me
          to breathe. She’d look back at me with those soft eyes, as if to say,
          “We’ll get there. One step at a time.”
        </p>

        <p style={styles.text}>
          She’s older now, and her body moves slower, but her spirit is strong.
          Every mile we walked together built her into the quiet anchor of our
          pack.
        </p>

        <p style={styles.text}>
          Sailor Ann is proof that gentleness is its own kind of strength.
        </p>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    padding: "40px",
    maxWidth: "1000px",
    margin: "auto",
    color: "#e0faff",
    fontFamily: "Segoe UI, sans-serif",
  },
  hero: {
    textAlign: "center",
    marginBottom: "40px",
  },
  title: {
    fontSize: "3.2rem",
    textShadow: "0 0 25px #00eaff",
    marginBottom: "10px",
  },
  role: {
    fontSize: "1.4rem",
    color: "#ffb