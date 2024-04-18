import { Outlet } from 'react-router-dom';

// ==============================|| MINIMAL LAYOUT ||============================== //
console.log('loaded minimal layout')
const MinimalLayout = () => (
  <>
    <Outlet />
  </>
);

export default MinimalLayout;
