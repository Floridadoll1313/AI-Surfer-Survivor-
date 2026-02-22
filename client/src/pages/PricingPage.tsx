
`tsx
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import "../GlobalTheme.css";

function PricingPage() {
  return (
    <Layout>
      <Hero
        title="Choose Your Surfboard"
        subtitle="Four cinematic tiers — each unlocking deeper tides of creativity."
        variant="wave"
      />

      <div className="wave-divider"></div>

      <div className="card-grid">
        <div className="card cosmic-border">
          <h2>Bronze Board</h2>
          <p>Starter access to the cosmic tide.</p>
          <a href="/checkout/bronze" className="btn-glow">Ride</a>
        </div>

        <div className="card cosmic-border">
          <h2>Silver Board</h2>
          <p>Deeper waves, more power.</p>
          <a href="/checkout/silver" className="btn-glow">Ride</a>
        </div>

        <div className="card cosmic-border">
          <h2>Gold Board</h2>
          <p>Elite access to the mythic tides.</p>
          <a href="/checkout/gold" className="btn-glow">Ride</a>
        </div>

        <div className="card cosmic-border">
          <h2>Diamond Board</h2>
          <p>The full cosmic ocean — unleashed.</p>
          <a href="/checkout/diamond" className="btn-glow">Ride</a>
        </div>
      </div>
    </Layout>
  );
}

export default PricingPage;
`