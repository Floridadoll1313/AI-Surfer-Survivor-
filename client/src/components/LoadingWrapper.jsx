import React, { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";

export default function LoadingWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return loading ? <LoadingScreen /> : children;
}