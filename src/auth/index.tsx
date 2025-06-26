import { AUTH_ROUTES, PRIVATE_ROUTES } from '../routing/routes';
import {
  CACHED_URL_LOCAL_STORAGE_KEY,
  ROLES,
  LOCAL_STORAGE_KEY,
} from '../utils/constants';
import {
  decodeToken,
  getLocalStorage,
  isTokenActive,
  setLocalStorage,
} from '../utils/helper';

// Extend JwtPayload to include 'role'
declare module 'jwt-decode' {
  export interface JwtPayload {
    role?: string;
  }
}

export const REDIRECTION = {
  [ROLES.ADMIN]: PRIVATE_ROUTES.DASHBOARD.url,
  [ROLES.USER]: PRIVATE_ROUTES.ACCOUNT.url,
};

export interface GetAuthOptions {
  // Define properties as needed, for example:
  // token?: string;
  // userRole?: ROLES;
  isCacheRedirection?: boolean;
  [key: string]: unknown;
}

export interface AuthResult {
  isAuthenticated: boolean;
  redirectUrl: string;
  role: string;
}

export const getAuth = (options: GetAuthOptions): AuthResult => {
  const { isCacheRedirection } = options;

  const token = getLocalStorage(LOCAL_STORAGE_KEY);
  const cachedRedirectUrl = getLocalStorage(CACHED_URL_LOCAL_STORAGE_KEY);
  const isAuthenticated = isTokenActive(token);

  let redirectUrl = AUTH_ROUTES.LOGIN.url;
  let role = '';

  if (isAuthenticated) {
    const decodedToken = decodeToken(token);
    role = decodedToken?.role || '';
    redirectUrl = role
      ? cachedRedirectUrl || REDIRECTION[role]
      : AUTH_ROUTES.LOGIN.url;
  }

  if (isCacheRedirection && !isAuthenticated) {
    const { pathname, search } = window?.location || {};
    const cachedRedirectUrl = pathname + search;
    setLocalStorage(CACHED_URL_LOCAL_STORAGE_KEY, cachedRedirectUrl);
  }

  return {
    isAuthenticated,
    redirectUrl,
    role,
  };
};
