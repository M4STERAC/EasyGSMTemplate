//React imports
import { StrictMode, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

//project import
// import reportWebVitals from './reportWebVitals';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <StrictMode>
    <ReduxProvider store={true as any}>
      <Router>
        <App />
        <Routes>
          <Route path="/" element={null}>
            <Route path="/" element={null}></Route>
          </Route>
        </Routes>
      </Router>
    </ReduxProvider>
  </StrictMode>,
);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
