import React from "react";
import Link from "next/link";
import "./NavBar.css";

const NavBar: React.FC = () => {
  return (
    <nav className="nav-container">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          OTD
        </Link>

        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/members">Members</Link>
          <Link href="/lessons">Lessons</Link>
          <Link href="/survivorworld">Survivor World</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/thevault">The Vault</Link>
          <Link href="/founders">Founders</Link>

          {/* SECTORS */}
          <div className="nav-dropdown">
            <span className="dropdown-label">Sectors ▾</span>
            <div className="dropdown-menu">
              <Link href="/sector1">Sector 1</Link>
              <Link href="/sector2">Sector 2</Link>
              <Link href="/sector3">Sector 3</Link>
              <Link href="/sector4">Sector 4</Link>
              <Link href="/sector5">Sector 5</Link>
              <Link href="/sector6">Sector 6</Link>
              <Link href="/sector7">Sector 7</Link>
              <Link href="/sector8">Sector 8</Link>
              <Link href="/sector9">Sector 9</Link>
              <Link href="/sector10">Sector 10</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
