
`tsx
import "../GlobalTheme.css";
import "../animations/HeroWave.css";
import "../animations/HeroStorm.css";
import "../animations/HeroCosmic.css";
import "../animations/HeroDeepSea.css";

type HeroProps = {
  title: string;
  subtitle: string;
  variant: "wave" | "storm" | "cosmic" | "deepsea";
};

function Hero({ title, subtitle, variant }: HeroProps) {
  return (
    <section className={hero-${variant}}>
      <h1 className="glow-title">{title}</h1>
      <p>{subtitle}</p>
    </section>
  );
}

export default Hero;
`