import React, { createContext, useContext, useState, ReactNode } from 'react';
import { login } from '@/services/login-service';
import { UserLoginInfo } from '@/models/users';

interface AuthContextProps {
  isAuthenticated: boolean;
  Authlogin: (userInfo: UserLoginInfo) => Promise<any>;
  Authlogout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const authlogin = async (userInfo: UserLoginInfo) => {
    const validatedUser = await login(userInfo);
    if (validatedUser) {
      setIsAuthenticated(true);
    }
    return validatedUser;
  };

  const authlogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, Authlogin: authlogin, Authlogout: authlogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
