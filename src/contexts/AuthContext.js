import React, { createContext, useState, useContext, useEffect } from 'react';
import { isAuthenticated, getCurrentUser, login, logout } from '../utils/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on initial load
    if (isAuthenticated()) {
      setCurrentUser(getCurrentUser());
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    login(userData);
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    login: handleLogin,
    logout: handleLogout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
