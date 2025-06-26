import { createContext, useState, useEffect, type ReactNode } from 'react';
import { LOCAL_STORAGE_KEY, ROLES } from '../utils/constants';
import { decodeToken } from '../utils/helper';
import { AUTH_ROUTES } from '../routing/routes';
import useLocalStorage from '../hooks/use-local-storage';
import { REDIRECTION } from '.';
import { useTimeout } from '@mantine/hooks';

const AuthContext = createContext<unknown>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken, removeToken] = useLocalStorage(LOCAL_STORAGE_KEY, '');

  const [user, setUser] = useState(() => {
    if (token) {
      return decodeToken(token);
    }
    return {};
  });

  const role = user?.role || '';

  const isAdmin = role === ROLES.ADMIN;

  const redirectUrl = role ? REDIRECTION[role] : AUTH_ROUTES.LOGIN.url;

  const login = (newToken: string) => {
    setToken(newToken);
  };

  const resetAllStores = () => {};

  const { start, clear } = useTimeout(() => resetAllStores(), 1000);

  const logout = () => {
    removeToken();
    start();
  };

  useEffect(() => {
    if (token) {
      setUser(decodeToken(token));
    } else {
      setUser({});
    }
  }, [token]);

  useEffect(() => {
    return () => {
      clear();
    };
  }, [clear]);

  return (
    <AuthContext.Provider
      value={{
        role,
        user,
        redirectUrl,
        login,
        logout,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
