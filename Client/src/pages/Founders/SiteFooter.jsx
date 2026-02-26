function SiteFooter() {
  return (
    <footer
      style={{
        padding: "20px",
        textAlign: "center",
        background: "#001f3f",
        color: "white",
      }}
    >
      <p>© {new Date().getFullYear()} Ocean Tide Drop</p>
    </footer>
  );
}

export default SiteFooter;
