
`jsx
import LoadingWrapper from "./components/LoadingWrapper";
import CosmicSoundscape from "./components/CosmicSoundscape";
import AppRoutes from "./Routes";
import "./GlobalTheme.css";
import "./animations/CosmicBackground.css";
import "./animations/FounderCardAnimations.css";
import "./animations/CosmicBorders.css";
import "./animations/ParallaxOcean.css";
import "./animations/Surfboard3D.css";

function App() {
  return (
    <LoadingWrapper>
      <CosmicSoundscape />
      <AppRoutes />
    </LoadingWrapper>
  );
}

export default App;
`
