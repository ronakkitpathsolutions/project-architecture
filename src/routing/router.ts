import { createBrowserRouter, redirect } from 'react-router';
import { getAuth } from '../auth';

// Routes
import { AUTH_ROUTES, PRIVATE_ROUTES, PLAIN_ROUTES } from './routes';

// Pages
import { PageNotFound } from '../components';

// Layouts
import AuthLayout from '../layouts/auth-layout';
import PlainLayout from '../layouts/plain-layout';
import DashboardLayout from '../layouts/dashboard-layout';

// Plain pages
import Home from '../pages/home';
import EmailVerification from '../pages/email-verification';
import PrivacyPolicy from '../pages/privacy-policy';
import TermsAndConditions from '../pages/terms-and-conditions';

// Auth pages
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import ForgotPassword from '../pages/auth/forgot-password';
import ResetPassword from '../pages/auth/reset-password';

// Dashboard pages
import Dashboard from '../pages/dashboard';
import Settings from '../pages/settings';
import Account from '../pages/account';

const authLayoutLoader = () => {
  const { isAuthenticated, redirectUrl } = getAuth({});
  if (isAuthenticated) {
    return redirect(redirectUrl);
  }
  return null;
};

const dashboardLayoutLoader = () => {
  const { isAuthenticated, redirectUrl } = getAuth({
    isCacheRedirection: true,
  });

  if (!isAuthenticated) {
    return redirect(redirectUrl);
  }
  return null;
};

const dashboardPageLoader = (roles: string[]) => () => {
  const { isAuthenticated, role } = getAuth({});

  if (isAuthenticated && !roles.includes(role)) {
    return redirect('/404');
  }

  return null;
};

export const router = createBrowserRouter([
  {
    ...PLAIN_ROUTES.layout,
    Component: PlainLayout,
    children: [
      { ...PLAIN_ROUTES.HOME, Component: Home },
      { ...PLAIN_ROUTES.EMAIL_VERIFICATION, Component: EmailVerification },
      { ...PLAIN_ROUTES.PRIVACY_POLICY, Component: PrivacyPolicy },
      { ...PLAIN_ROUTES.TERMS_AND_CONDITIONS, Component: TermsAndConditions },
    ],
  },
  {
    ...AUTH_ROUTES.layout,
    Component: AuthLayout,
    loader: authLayoutLoader,
    children: [
      {
        ...PLAIN_ROUTES.root,
        loader: () => {
          return redirect(AUTH_ROUTES.LOGIN.url);
        },
      },
      { ...AUTH_ROUTES.LOGIN, Component: Login },
      { ...AUTH_ROUTES.REGISTER, Component: Register },
      { ...AUTH_ROUTES.FORGOT_PASSWORD, Component: ForgotPassword },
      { ...AUTH_ROUTES.RESET_PASSWORD, Component: ResetPassword },
    ],
  },
  {
    ...PRIVATE_ROUTES.layout,
    Component: DashboardLayout,
    loader: dashboardLayoutLoader,
    children: [
      {
        ...PRIVATE_ROUTES.DASHBOARD,
        Component: Dashboard,
        loader: dashboardPageLoader(PRIVATE_ROUTES.DASHBOARD.roles),
      },
      {
        ...PRIVATE_ROUTES.SETTINGS,
        Component: Settings,
        loader: dashboardPageLoader(PRIVATE_ROUTES.SETTINGS.roles),
      },
      {
        ...PRIVATE_ROUTES.ACCOUNT,
        Component: Account,
        loader: dashboardPageLoader(PRIVATE_ROUTES.ACCOUNT.roles),
      },
    ],
  },
  { path: '*', Component: PageNotFound },
]);
