import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { compareDatesForNotifications } from '../../utils/Date';
import { getComparator, stableSort } from '../../utils/anythingData';
import { FireStore } from '../../utils/firebase';
import { deleteNotification } from '../../store/reducers/notification';

// material-ui
import { Avatar, List, ListItemAvatar, ListItemButton, ListItemSecondaryAction, ListItemText, Stack, Typography } from '@mui/material';

// assets
import { FileProtectOutlined, FileExcelOutlined, CloseOutlined } from '@ant-design/icons';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// ==============================|| ORDER TABLE ||============================== //

export default function BackupNotification({ itemsPerPage, page, backupNotifications }) {
  const dispatch = useDispatch();
  const [order] = useState('desc');
  const [orderBy] = useState('date');
  const [hovered, setHovered] = useState(false);
  const sortedNotifications = stableSort(backupNotifications, getComparator(order, orderBy));
  const BackupNotificationPage = sortedNotifications.slice(page * itemsPerPage - itemsPerPage, page * itemsPerPage);
  const handleDeleteNotification = (id) => {
    dispatch(deleteNotification({ type: 'backup', id }));
    if (!localStorage.getItem('uid')) return;
    FireStore.deleteBackupNotification(id);
  };

  return (
    <>
      <List
        component="nav"
        sx={{
          px: 0,
          py: 0,
          '& .MuiListItemButton-root': {
            py: 1.5,
            '& .MuiAvatar-root': avatarSX,
            '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
          }
        }}
      >
        {BackupNotificationPage.map((notification) => {
          let color;

          switch (notification.status) {
            case 0:
              color = 'error';
              break;
            case 1:
              color = 'primary';
              break;
            default:
              color = 'primary';
          }
          return (
            <ListItemButton divider key={notification.id} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: `${color}.main`,
                    bgcolor: `${color}.lighter`
                  }}
                >
                  {notification.status ? <FileProtectOutlined /> : <FileExcelOutlined />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1">
                    {notification.game.length > 15 ? `${notification.game.substring(0, 15)}...` : notification.game}
                    {' - '}
                    {notification.name.length > 15 ? `${notification.name.substring(0, 15)}...` : notification.name}
                  </Typography>
                }
                secondary={`${compareDatesForNotifications(notification.date)}`}
              />
              {!hovered ? (
                <ListItemSecondaryAction>
                  <Stack alignItems="flex-end">
                    <Typography variant="subtitle1" noWrap>
                      Status
                    </Typography>
                    <Typography variant="h6" color={notification.status ? 'secondary' : `${color}.main`} noWrap>
                      {notification.status ? 'Success' : 'Failed'}
                    </Typography>
                  </Stack>
                </ListItemSecondaryAction>
              ) : (
                <CloseOutlined onClick={() => handleDeleteNotification(notification.id)} />
              )}
            </ListItemButton>
          );
        })}
      </List>
    </>
  );
}

BackupNotification.propTypes = {
  itemsPerPage: PropTypes.number,
  page: PropTypes.number,
  backupNotifications: PropTypes.array
};
