import { useDisclosure } from '@mantine/hooks';
import { AppShell, Avatar, Burger, Container, Group } from '@mantine/core';
import { Outlet, useNavigate } from 'react-router';
import useProfileStore from '../../pages/account/profile/use-profile-store';
import useFetchWithAbort from '../../hooks/use-fetch-with-abort';
import { usePageData } from '../../hooks/use-page-data';
import useAuth from '../../auth/use-auth';
import { ICONS } from '../../assets/icons';
import { AUTH_ROUTES, PRIVATE_ROUTES } from '../../routing/routes';
import { useEffect } from 'react';
import NavBar from './navbar';
import { Menu } from '../../components';
import { createFileUrl } from '../../utils/helper';
import { ConfirmModal } from '../../components/confirm-modal';
import Icon from '../../assets/icons/icon';

const DashboardLayout = () => {
  usePageData();
  const [mobileDrawerOpened, mobileDrawerHandler] = useDisclosure();
  const [logoutConfirmOpened, logoutConfirmHandler] = useDisclosure();

  const { data, getData } = useProfileStore();
  const [fetchData] = useFetchWithAbort(getData);

  const { user, logout } = useAuth() as any;

  const fullName =
    `${data?.first_name || ''} ${data?.last_name || ''}`.trim() || '';

  const navigate = useNavigate();

  const PROFILE_MENU_ITEMS = [
    { id: 'profile', label: 'Profile', icon: ICONS.IconUser },
    { id: 'logout', label: 'Logout', icon: ICONS.IconLogout },
  ];

  const onItemClick = (id: string) => {
    if (id === 'profile') {
      navigate(PRIVATE_ROUTES.ACCOUNT.url);
    }
    if (id === 'logout') {
      logoutConfirmHandler.open();
    }
  };

  const onLogoutConfirm = () => {
    logout();
    navigate(AUTH_ROUTES.LOGIN.url);
    logoutConfirmHandler.close();
  };

  const profileUrl = createFileUrl(data?.profile);

  useEffect(() => {
    if (user?.id) {
      fetchData({ id: user?.id });
    }
  }, [fetchData, user?.id]);

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileDrawerOpened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Container h="100%" size="var(--mantine-breakpoint-xxl)" px={0}>
            <Group h="100%" px="md">
              <Burger
                opened={mobileDrawerOpened}
                onClick={mobileDrawerHandler.toggle}
                hiddenFrom="sm"
                size="sm"
              />
              <Group w="100%" justify="space-between">
                Logo
                <Menu
                  width={100}
                  {...{ onItemClick }}
                  position="bottom-end"
                  items={PROFILE_MENU_ITEMS}
                >
                  <Avatar
                    color="initials"
                    src={profileUrl}
                    alt={fullName}
                    name={fullName}
                    bd="1px solid var(--mantine-primary-color-3)"
                  />
                </Menu>
              </Group>
            </Group>
          </Container>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          Navbar
          <NavBar />
        </AppShell.Navbar>
        <AppShell.Main>
          <Container size="var(--mantine-breakpoint-xxl)" px={0}>
            <Outlet />
          </Container>
        </AppShell.Main>
      </AppShell>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        opened={logoutConfirmOpened}
        onClose={logoutConfirmHandler.close}
        icon={ICONS.IconLogout}
        title="Logout?"
        message="Are you sure you want to logout?"
        confirmButtonProps={{
          label: 'Logout',
          leftSection: <Icon component={ICONS.IconLogout} size={16} />,
          onClick: onLogoutConfirm,
        }}
      />
    </>
  );
};

export default DashboardLayout;
