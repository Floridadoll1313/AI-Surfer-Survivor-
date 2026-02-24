import React from "react";
import NavBar from "./NavBar";
import SiteFooter from "./SiteFooter";

export default function Layout({ children }) {
  return (
    <div className="layout-container">
      <NavBar />

      <main className="content-area">
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}