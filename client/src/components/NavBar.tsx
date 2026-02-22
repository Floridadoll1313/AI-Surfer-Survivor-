import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Ocean Tide Drop</Link>
      </div>

      <ul className="navbar-links">

        {/* HOME */}
        <li>
          <Link to="/">Home</Link>
        </li>

        {/* FOUNDERS */}
        <li>
          <Link to="/founders">Founders</Link>
        </li>

        {/* LORE */}
        <li>
          <Link to="/lore/shannon">Lore</Link>
        </li>

        {/* OPTIONAL: Add more sections later */}
        {/* <li><Link to="/challenges">Challenges</Link></li> */}
        {/* <li><Link to="/inventory">Inventory</Link></li> */}

      </ul>
    </nav>
  );
}

export default NavBar;