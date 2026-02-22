
`tsx
import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import "../animations/LoadingToHomeTransition.css";

function LoadingWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => setLoading(false), 800);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className={exiting ? "loading-exit" : ""}>
        <LoadingScreen />
      </div>
    );
  }

  return <div className="home-enter">{children}</div>;
}

export default LoadingWrapper;
`