import NavBar from "./NavBar";
import SiteFooter from "./SiteFooter";
import "../GlobalTheme.css";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div className="layout-wrapper">
      <NavBar />
      <main className="layout-content">{children}</main>
      <SiteFooter />
    </div>
  );
}

export default Layout;