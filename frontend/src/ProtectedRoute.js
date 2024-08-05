// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); 

  console.log('isAuthenticated:', isAuthenticated); // Debug statement

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
