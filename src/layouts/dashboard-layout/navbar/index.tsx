import { Link } from 'react-router';
import { NavLink, rem } from '@mantine/core';
import { ICONS } from '../../../assets/icons';
import { PRIVATE_ROUTES } from '../../../routing/routes';
import useAuth from '../../../auth/use-auth';
import Icon from '../../../assets/icons/icon';

const DASHBOARD_NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: ICONS.IconHome,
    url: PRIVATE_ROUTES.DASHBOARD.url,
    roles: PRIVATE_ROUTES.DASHBOARD.roles,
  },
  {
    id: 'users',
    label: 'Users',
    icon: ICONS.IconUsers,
    url: PRIVATE_ROUTES.USERS.url,
    roles: PRIVATE_ROUTES.USERS.roles,
  },
  {
    id: 'add-users',
    label: 'Add Users',
    icon: ICONS.IconUserPlus,
    url: PRIVATE_ROUTES.ADD_USERS.url,
    roles: PRIVATE_ROUTES.ADD_USERS.roles,
  },
  {
    id: 'accounts',
    label: 'Accounts',
    icon: ICONS.IconUsers,
    url: PRIVATE_ROUTES.ACCOUNT.url,
    roles: PRIVATE_ROUTES.ACCOUNT.roles,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: ICONS.IconSettings,
    url: PRIVATE_ROUTES.SETTINGS.url,
    roles: PRIVATE_ROUTES.SETTINGS.roles,
  },
] as const;

type NavItem = (typeof DASHBOARD_NAV_ITEMS)[number];

type AccessibleNavItemProps = NavItem & {
  children?: any[];
  roles?: string[];
  id: string | number;
  label: string;
  icon: React.ElementType;
  url: string;
};

const NavBar = ({ mobileDrawerHandler }: any) => {
  const { role } = useAuth() as any;

  const accessibleNavItems = DASHBOARD_NAV_ITEMS.filter(({ roles }) =>
    roles?.includes(role)
  );

  return accessibleNavItems.map(
    ({ id, label, icon, url, children }: AccessibleNavItemProps) => {
      const isNested = Boolean(children?.length);

      const isActive = isNested
        ? children?.map(({ url }) => url).includes(location?.pathname)
        : location?.pathname === url;

      return (
        <NavLink
          component={Link}
          key={id}
          {...{ label }}
          leftSection={<Icon component={icon} size={18} stroke={1.25} />}
          active={isActive}
          to={url}
          style={{
            borderRadius: 'var(--mantine-radius-default)',
            ...(isActive && {
              border: '1px solid var(--mantine-primary-color-1)',
              fontWeight: 400,
            }),
          }}
          onClick={() => {
            mobileDrawerHandler?.close();
          }}
          w={{ base: '100%', sm: 'auto' }}
          px={{ sm: 8 }}
          py={{ sm: 6 }}
          styles={{
            section: {
              marginInlineEnd: 'var(--mantine-spacing-xs)',
              marginBottom: rem(-1),
            },
          }}
        />
      );
    }
  );
};

export default NavBar;
