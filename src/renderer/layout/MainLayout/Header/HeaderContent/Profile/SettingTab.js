import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//local imports
import { setTheme } from '../../../../store/reducers/settings';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { SunOutlined, MoonOutlined } from '@ant-design/icons';

// ==============================|| HEADER PROFILE - SETTING TAB ||============================== //

const SettingTab = () => {
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const theme = useTheme();

  const [selectedIndex /*setSelectedIndex*/] = useState(0);
  // const handleListItemClick = (event, index) => {
  //   setSelectedIndex(index);
  // };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
      <ListItemButton selected={selectedIndex === 1} onClick={() => dispatch(setTheme())}>
        <ListItemIcon>{settings.theme === 'dark' ? <SunOutlined /> : <MoonOutlined />}</ListItemIcon>
        <ListItemText primary={`${settings.theme === 'dark' ? 'Light' : 'Dark'} Mode`} />
      </ListItemButton>
    </List>
  );
};

export default SettingTab;
