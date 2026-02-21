import React from "react";

const StormyGray = () => {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Stormy Gray</h1>
      <h2 style={styles.subtitle}>The Protector</h2>

      <div style={styles.imageRow}>
        <img
          src="/65ad77bb-8dac-4a4e-8409-e78175401b1f-1_all_5330.jpg"
          alt="Stormy Gray resting"
          style={styles.image}
        />
        <img
          src="/65ad77bb-8dac-4a4e-8409-e78175401b1f-1_all_5332.jpg"
          alt="Stormy Gray lying down"
          style={styles.image}
        />
      </div>

      <p style={styles.text}>
        <strong>Stormy Gray</strong> is my shield — loyal, alert, and fiercely
        loving. She has walked beside me through every dark night, every long
        stretch of road, every moment where I didn’t know what tomorrow would
        bring.
      </p>

      <p style={styles.text}>
        People misunderstand her sometimes. They see her intensity and think
        she’s an “attack dog.” But Stormy isn’t violent — she’s vigilant. She’s
        a survivor, just like me.
      </p>

      <p style={styles.text}>
        When we were abandoned at that gas station… when we slept in the
        woods… when we walked for hours with nothing but hope and a cart…
        Stormy stayed close, watching every sound, every shadow, every stranger.
      </p>

      <p style={styles.text}>
        She is courage wrapped in fur. She is loyalty in motion. She is the
        heartbeat that kept me going when I had nothing left.
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

export default StormyGray;