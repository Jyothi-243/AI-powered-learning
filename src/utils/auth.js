// Simple authentication utility for demo purposes
// In a production app, you would use a proper authentication system

export const login = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const isAuthenticated = () => {
  return localStorage.getItem('user') !== null;
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
