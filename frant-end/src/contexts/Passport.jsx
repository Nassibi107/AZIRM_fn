// src/components/auth/AuthGuard.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import {  useUserContext } from './UserContext';

const Passport = ({ children }) => {
  const { user } = useUserContext();
    console.log(user);  
  if (!user) {
    return <Navigate to="/sas" />;
  }

  return children;
};

export default Passport;
