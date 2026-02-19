import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isMember = localStorage.getItem('membership_active') === 'true';

  if (!isMember) {
    return <Navigate to="/members" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
