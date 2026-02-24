import React from "react";
import { Navigate } from "react-router-dom";
import { useProgression } from "../source/hooks/ProgressionContext";

export default function ProtectedRoute({ children }) {
  const { isUnlocked } = useProgression();

  if (!isUnlocked) {
    return <Navigate to="/" replace />;
  }

  return children;
}