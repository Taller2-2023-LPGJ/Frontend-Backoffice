import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

interface User {
  mail: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user?: User;
  login: (mail: string, pass: string) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | undefined>();

  const login = async (mail: string, pass: string) => {
    let email = mail;
    let password = pass;

    try {
      const result = await axios.post(
        `https://t2-users-snap-msg-auth-user-julianquino.cloud.okteto.net/admins/signin`,
        {
          email,
          password,
        }
      );

      setIsAuthenticated(true);
      setUser({ mail: email });

      // Attach token to header
      axios.defaults.headers.common["token"] = `${result.data.token}`;

      return result;
    } catch (e) {
      return { error: true, message: (e as any).response.data.message };
    }
  };

  const logout = () => {
    axios.defaults.headers.common["token"] = "";
    setUser(undefined);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
