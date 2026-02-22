import NavBar from "./NavBar";
import SiteFooter from "./SiteFooter";
import "../GlobalTheme.css";

function Layout({ children }) {
  return (
    <div className="layout-wrapper">
      {/* NAVIGATION */}
      <NavBar />

      {/* PAGE CONTENT */}
      <main className="layout-content">
        {children}
      </main>

      {/* FOOTER */}
      <SiteFooter />
    </div>
  );
}

export default Layout;