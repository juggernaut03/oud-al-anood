import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api, clearTokens, getAccessToken, setTokens } from '../lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | authenticated | unauthenticated

  const refresh = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      setUser(null);
      setStatus('unauthenticated');
      return null;
    }
    try {
      const { data } = await api.get('/api/users/me');
      if (data?.success && data.user) {
        setUser(data.user);
        setStatus('authenticated');
        return data.user;
      }
      clearTokens();
      setUser(null);
      setStatus('unauthenticated');
      return null;
    } catch {
      clearTokens();
      setUser(null);
      setStatus('unauthenticated');
      return null;
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(async ({ email, password }) => {
    const { data } = await api.post('/api/users/login', { email, password });
    if (!data?.success || !data.accessToken) {
      throw new Error(data?.message || 'Login failed');
    }
    setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
    await refresh();
    return data.user;
  }, [refresh]);

  const register = useCallback(async (payload) => {
    const { data } = await api.post('/api/users/register', payload);
    if (!data?.success || !data.accessToken) {
      throw new Error(data?.message || 'Registration failed');
    }
    setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
    await refresh();
    return data.user;
  }, [refresh]);

  const logout = useCallback(async () => {
    try {
      await api.post('/api/users/logout');
    } catch {
      // ignore
    }
    clearTokens();
    setUser(null);
    setStatus('unauthenticated');
  }, []);

  const updateProfile = useCallback(async (payload) => {
    const { data } = await api.put('/api/users/me', payload);
    if (data?.user) setUser(data.user);
    return data?.user;
  }, []);

  const changePassword = useCallback(async ({ currentPassword, newPassword }) => {
    const { data } = await api.put('/api/users/me/password', { currentPassword, newPassword });
    return data;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        isAuthenticated: status === 'authenticated',
        login,
        register,
        logout,
        refresh,
        updateProfile,
        changePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
