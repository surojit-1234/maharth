// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.isAuthenticated); 
   console.log("isAuthenicated: ",isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/login" replace/>;
};

export default ProtectedRoute;
