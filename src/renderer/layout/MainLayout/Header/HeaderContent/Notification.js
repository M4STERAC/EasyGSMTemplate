import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Badge,
  Box,
  ClickAwayListener,
  IconButton,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Popper,
  Typography,
  useMediaQuery
} from '@mui/material';

// project import
import MainCard from '../../../../components/MainCard';
import Transitions from '../../../../components/@extended/Transitions';
import { getComparator, stableSort } from '../../../../utils/anythingData';
import { FireStore } from '../../../../utils/firebase';
import { setGeneralNotification, deleteNotification } from '../../../../store/reducers/notification';

// assets
import { BellOutlined, CloseOutlined, CheckOutlined, StopOutlined, InfoCircleOutlined } from '@ant-design/icons';

// sx styles
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

const actionSX = {
  mt: '6px',
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',

  transform: 'none'
};

const icons = {
  error: <StopOutlined />,
  info: <InfoCircleOutlined />,
  success: <CheckOutlined />
};

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const generalNotifications = notification.general;
  useEffect(() => {
    if (generalNotifications.length > 0) return;
    FireStore.getGeneralNotifications().then((notifications) => {
      dispatch(setGeneralNotification({ notifications }));
    });
    //eslint-disable-next-line
  }, []);
  const [order] = useState('desc');
  const [orderBy] = useState('date');
  const sortedUserNotifications = stableSort(generalNotifications, getComparator(order, orderBy));
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpen(false);
  };

  const handleDeleteNotification = (id) => {
    FireStore.deleteGeneralNotification(id).then(() => {
      dispatch(deleteNotification({ type: 'general', id }));
    });
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        disableRipple
        color="secondary"
        sx={{ color: 'text.primary', bgcolor: open ? 'border.active' : 'border.primary' }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Badge badgeContent={sortedUserNotifications.length} color="primary">
          <BellOutlined />
        </Badge>
      </IconButton>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? -5 : 0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: '100%',
                minWidth: 285,
                maxWidth: 420,
                [theme.breakpoints.down('md')]: {
                  maxWidth: 285
                }
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  title="Notifications"
                  elevation={0}
                  border={false}
                  content={false}
                  secondary={
                    <IconButton size="small" onClick={handleToggle}>
                      <CloseOutlined />
                    </IconButton>
                  }
                >
                  <List
                    component="nav"
                    sx={{
                      p: 0,
                      '& .MuiListItemButton-root': {
                        py: 0.5,
                        '& .MuiAvatar-root': avatarSX,
                        '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                      }
                    }}
                  >
                    {sortedUserNotifications.map((notification) => {
                      let color;
                      let icon;
                      if (notification.type === 0) {
                        color = 'error'; // 0 = error
                        icon = icons.error;
                      }
                      if (notification.type === 1) {
                        color = 'primary'; // 1 = info
                        icon = icons.info;
                      }
                      if (notification.type === 2) {
                        color = 'success'; // 2 = success
                        icon = icons.success;
                      }
                      return (
                        <ListItemButton divider key={notification.id}>
                          <ListItemAvatar>
                            <Avatar
                              sx={{
                                color: `${color}.main`,
                                bgcolor: `${color}.lighter`
                              }}
                            >
                              {icon}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText>{notification.message}</ListItemText>
                          <ListItemSecondaryAction>
                            <Typography variant="caption" noWrap>
                              <CloseOutlined onClick={() => handleDeleteNotification(notification.id)} />
                            </Typography>
                          </ListItemSecondaryAction>
                        </ListItemButton>
                      );
                    })}
                    {/* {============================  Old Code Below  ==============================} */}
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Notification;
