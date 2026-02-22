
`tsx
import NavBar from "./NavBar";
import SiteFooter from "./SiteFooter";
import "../GlobalTheme.css";
import "../animations/PageTransitions.css";

function Layout({ children }) {
  return (
    <div className="layout-wrapper">
      <NavBar />

      <main className="layout-content page-transition">
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}

export default Layout;
`
