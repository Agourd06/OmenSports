import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ element, requiredRole }) => {
  const token = localStorage.getItem('token');
  let userRole = null;
  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1])); 
    userRole = decodedToken.role;     
  }
  
  const isAuthenticated = !!token;
  const hasRequiredRole = userRole === requiredRole;



  return isAuthenticated && hasRequiredRole ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
