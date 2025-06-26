import { ROLES, APP_TITLE } from '../utils/constants';

export const PLAIN_ROUTES = {
  root: { path: '/', url: '/', title: APP_TITLE },
  layout: {
    path: '/',
  },
  HOME: {
    index: true,
    title: 'Home',
    url: '/',
  },
  EMAIL_VERIFICATION: {
    title: 'Email Verification',
    path: '/email-verification',
    url: '/email-verification',
  },
  PRIVACY_POLICY: {
    title: 'Privacy Policy',
    path: '/privacy-policy',
    url: '/privacy-policy',
  },
  TERMS_AND_CONDITIONS: {
    title: 'Terms and Conditions',
    path: '/terms-and-conditions',
    url: '/terms-and-conditions',
  },
};

export const AUTH_ROUTES = {
  layout: {},
  LOGIN: {
    title: 'Login',
    path: '/login',
    url: '/login',
  },
  REGISTER: {
    title: 'Register',
    path: '/register',
    url: '/register',
  },
  FORGOT_PASSWORD: {
    title: 'Forgot Password',
    path: '/forgot-password',
    url: '/forgot-password',
  },
  RESET_PASSWORD: {
    title: 'Reset Password',
    path: '/reset-password',
    url: '/reset-password',
  },
};

const DASHBOARD_PATH = '/dashboard';

export const PRIVATE_ROUTES = {
  layout: {
    path: '/',
  },
  DASHBOARD: {
    path: DASHBOARD_PATH,
    roles: Object.values(ROLES),
    title: 'Dashboard',
    url: DASHBOARD_PATH,
  },
  USERS: {
    roles: Object.values(ROLES),
    title: 'Users',
    path: '/users',
    url: '/users',
  },
  ADD_USERS: {
    roles: Object.values(ROLES),
    title: 'Add Users',
    path: '/users/add',
    url: '/users/add',
  },
  ACCOUNT: {
    roles: Object.values(ROLES),
    title: 'Account',
    path: '/account',
    url: '/account',
  },
  SETTINGS: {
    roles: Object.values(ROLES),
    title: 'Settings',
    path: '/settings',
    url: '/settings',
  },
};
