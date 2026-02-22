import NavBar from "./NavBar";
import SiteFooter from "./SiteFooter";

function Layout({ children }) {
  return (
    <div>
      <NavBar />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      <SiteFooter />
    </div>
  );
}

export default Layout;