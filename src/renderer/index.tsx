//React imports
import { StrictMode, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

//project import
import MinimalLayout from './layout/MinimalLayout';
import MainLayout from './layout/MainLayout';
import Loadable from './components/Loadable';
import { store } from './store';
import ThemeCustomization from './themes';
import reportWebVitals from './reportWebVitals';
import './assets/third-party/apex-chart.css';
import App from './App';

const AuthLogin = Loadable(
  lazy(() => import('./pages/authentication/Login')),
);
const AuthRegister = Loadable(
  lazy(() => import('./pages/authentication/Register')),
);
const DashboardDefault = Loadable(
  lazy(() => import('./pages/dashboard')),
);
const Typography = Loadable(
  lazy(() => import('./pages/components-overview/Typography')),
);
const Color = Loadable(
  lazy(() => import('./pages/components-overview/Color')),
);
const Shadow = Loadable(
  lazy(() => import('./pages/components-overview/Shadow')),
);
const AntIcons = Loadable(
  lazy(() => import('./pages/components-overview/AntIcons')),
);

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeCustomization>
        <Router>
          <App />
          <Routes>
            <Route path='/' element={<MinimalLayout />}>
              <Route path='/' element={<AuthLogin />}></Route>
              <Route path='register' element={<AuthRegister />}></Route>
            </Route>
            {/* <Route path='/dashboard' element={<MainLayout />}>
              <Route path='dashboard' element={<DashboardDefault />}></Route>
              <Route path='color' element={<Color />}></Route>
              <Route path='shadow' element={<Shadow />}></Route>
              <Route path='typography' element={<Typography />}></Route>
              <Route path='icons/ant' element={<AntIcons />}></Route>
              <Route path='logout' element={<AuthLogin />}></Route>
            </Route> */}
          </Routes>
        </Router>
      </ThemeCustomization>
    </ReduxProvider>
  </StrictMode>,
);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
