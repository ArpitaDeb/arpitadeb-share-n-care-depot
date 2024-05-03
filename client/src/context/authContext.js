import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');

  const login = (userId, userRole, authToken) => {
    localStorage.setItem('userId', userId);
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('authToken', authToken);
    setUserId(userId);
    setUserRole(userRole);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('authToken');
    setUserId('');
    setUserRole('');
  };

  return (
    <AuthContext.Provider value={{ userId, userRole, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
