import React from "react";

const SailorAnn = () => {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Sailor Ann</h1>
      <h2 style={styles.subtitle}>The Gentle Heart</h2>

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

      <p style={styles.text}>
        <strong>Sailor Ann</strong> is the quiet soul of the family — steady,
        soft, and full of wisdom earned from miles on the road. She doesn’t
        rush. She doesn’t push. She simply walks at her own pace, and we follow
        her lead.
      </p>

      <p style={styles.text}>
        When life forced us into the woods, into parking lots, into long days of
        walking with everything we owned in a cart, Sailor Ann reminded me to
        breathe. She’d look back at me with those soft eyes, as if to say,
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
  );
};

const styles = {
  page: {
    padding: "40px",
    maxWidth: "900px",
    margin: "auto",
    fontFamily: "Segoe UI, sans-serif",
  },
  title: {
    fontSize: "3rem",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#555",
    marginBottom: "30px",
  },
  imageRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
  },
  image: {
    width: "50%",
    borderRadius: "12px",
    objectFit: "cover",
  },
  text: {
    fontSize: "1.2rem",
    lineHeight: "1.7",
    marginBottom: "20px",
  },
};

export default SailorAnn;