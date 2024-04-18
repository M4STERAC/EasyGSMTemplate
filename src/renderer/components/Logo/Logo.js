import logoLight from '../../assets/images/logo.png';
import darkLogo from '../../assets/images/logoDark.png';
import { useSelector } from 'react-redux';

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const settings = useSelector((state) => state.settings);
  let logo = settings.theme === 'dark' ? darkLogo : logoLight;
  return (
    <>
      <img src={logo} alt="EasyGSM" width="100" />
    </>
  );
};

export default Logo;
