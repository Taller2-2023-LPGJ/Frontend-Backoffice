// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';


interface User {
  mail:string,
}

interface AuthContextType {
  isAuthenticated: boolean;
  user?: User;
  login: (mail:string, pass:string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user,setUser] = useState<User|undefined>();

  const login = (mail:string, pass:string) => {

    console.log("Login using...")
    setIsAuthenticated(true);
    setUser({mail:mail})
    return true
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated,user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};