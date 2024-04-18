import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';
import { authTokenLoader, checkAuthTokenLoader } from '../utils/auth';
import { logout } from '../utils/auth';

// lazy loading
const DashboardDefault = Loadable(lazy(() => import('renderer/pages/dashboard')));
const Typography = Loadable(lazy(() => import('renderer/pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('renderer/pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('renderer/pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('renderer/pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/dashboard',
  element: <MainLayout />,
  id: 'root',
  loader: authTokenLoader,
  children: [
    {
      path: '/dashboard',
      loader: checkAuthTokenLoader,
      element: <DashboardDefault />
    },
    {
      path: '/dashboard/color',
      element: <Color />
    },
    {
      path: '/dashboard/shadow',
      element: <Shadow />
    },
    {
      path: '/dashboard/typography',
      element: <Typography />
    },
    {
      path: '/dashboard/icons/ant',
      element: <AntIcons />
    },
    {
      path: '/dashboard/logout',
      action: logout
    }
  ]
};

export default MainRoutes;
