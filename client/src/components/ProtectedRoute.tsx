import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // We check if the user has paid. 
  // In a production app, you'd check this via an API/Database.
  const isMember = localStorage.getItem('membership_active') === 'true';

  if (!isMember) {
    // If not a member, kick them to the payment page
    return <Navigate to="/members" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
