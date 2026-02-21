import React from "react";
import { Link } from "react-router-dom";

const FoundersPage = () => {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Meet the Founders</h1>
      <p style={styles.subtitle}>
        The loyal anchors who walked every mile of this journey.
      </p>

      <div style={styles.grid}>
        <Link to="/founders/sailor-ann" style={styles.card}>
          <img
            src="/20260220_130443.jpg"
            alt="Sailor Ann"
            style={styles.cardImage}
          />
          <h2 style={styles.cardName}>Sailor Ann</h2>
          <p style={styles.cardRole}>The Gentle Heart</p>
        </Link>

        <Link to="/founders/stormy-gray" style={styles.card}>
          <img
            src="/65ad77bb-8dac-4a4e-8409-e78175401b1f-1_all_5330.jpg"
            alt="Stormy Gray"
            style={styles.cardImage}
          />
          <h2 style={styles.cardName}>Stormy Gray</h2>
          <p style={styles.cardRole}>The Protector</p>
        </Link>

        <Link to="/founders/sky-marlin" style={styles.card}>
          <img
            src="/20260220_131307.jpg"
            alt="Sky Marlin"
            style={styles.cardImage}
          />
          <h2 style={styles.cardName}>Sky Marlin</h2>
          <p style={styles.cardRole}>The Little Captain</p>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: "40px",
    maxWidth: "1200px",
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
    marginBottom: "40px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
  },
  card: {
    textDecoration: "none",
    color: "inherit",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
    transition: "0.2s",
  },
  cardImage: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "15px",
  },
  cardName: {
    fontSize: "1.5rem",
    marginBottom: "5px",
  },
  cardRole: {
    color: "#777",
  },
};

export default FoundersPage;