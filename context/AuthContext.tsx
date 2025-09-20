import { loginUser as apiLogin, logoutUser as apiLogout, LoginRequest, LoginResponse } from '@/services/authService';
import { storage } from '@/utils/storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type User = LoginResponse['user'] | null;

type AuthContextType = {
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  user: User;
  login: (credentials: LoginRequest) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  setAuth: (payload: { token: string; user: NonNullable<User> }) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    (async () => {
      try {
        const [t, u] = await Promise.all([storage.getToken(), storage.getUserData()]);
        if (t) setToken(t);
        if (u) setUser(u);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const setAuth = async ({ token: t, user: u }: { token: string; user: NonNullable<User> }) => {
    await Promise.all([storage.setToken(t), storage.setUserData(u)]);
    setToken(t);
    setUser(u);
  };

  const login: AuthContextType['login'] = async (credentials) => {
    const res = await apiLogin(credentials);
    if (res.success && res.token && res.user) {
      await setAuth({ token: res.token, user: res.user });
    }
    return res as LoginResponse;
  };

  const logout = async () => {
    await apiLogout();
    await storage.clearAuthData();
    setToken(null);
    setUser(null);
  };

  const value = useMemo<AuthContextType>(() => ({
    isLoading,
    isAuthenticated: !!token,
    token,
    user,
    login,
    logout,
    setAuth,
  }), [isLoading, token, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
};
