import Layout from "../components/Layout";
import { Link } from "react-router-dom";

function FoundersPage() {
  return (
    <Layout>
      <div style={{ padding: "40px" }}>
        <h1>Founders</h1>
        <p>Meet the legendary founders of Ocean Tide Drop.</p>

        <ul>
          <li><Link to="/founders/sailor-ann">Sailor Ann</Link></li>
          <li><Link to="/founders/stormy-gray">Stormy Gray</Link></li>
          <li><Link to="/founders/sky-marlin">Sky Marlin</Link></li>
          <li><Link to="/founders/shannon">Shannon</Link></li>
        </ul>
      </div>
    </Layout>
  );
}

export default FoundersPage;