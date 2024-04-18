import { lazy } from 'react';

// project import
import Loadable from 'renderer/components/Loadable';
import MinimalLayout from 'renderer/layout/MinimalLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('renderer/pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('renderer/pages/authentication/Register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <AuthLogin />
    },
    {
      path: 'register',
      element: <AuthRegister />
    }
  ]
};

export default LoginRoutes;
