//React
import { useState, useEffect } from 'react';

// material-ui
import { Button, Grid, Box, Stack, Typography, Pagination } from '@mui/material';

// project import
import ServerList from './ServerList';
import BackupNotification from './BackupNotification';
import MainCard from '../../components/MainCard';
import Analytics from '../../components/cards/statistics/Analytics';
import AddServer from './AddServer';
import EditServer from './EditServer';
import DeleteServer from './DeleteServer';
import { useSelector, useDispatch } from 'react-redux';
import { setServerStatus } from '../../store/reducers/server';
import { useRouteLoaderData } from 'react-router-dom';
import { FireStore } from '../../utils/firebase';
import { setServers } from '../../store/reducers/server';
import { setBackupNotification } from '../../store/reducers/notification';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const server = useSelector((state) => state.server);
  const backupNotifications = useSelector((state) => state.notification.backups);
  useEffect(() => {
    if (server.servers.length == 0) {
      FireStore.getServers().then((servers) => {
        dispatch(setServers({ servers }));
      });
    }
    if (backupNotifications.length == 0) {
      FireStore.getBackupNotifications().then((notifications) => {
        dispatch(setBackupNotification({ notifications }));
      });
    } // eslint-disable-next-line
  }, []);
  const [serverListPage, setServerListPage] = useState(1);
  const [BackupNotificationPage, setBackupNotificationPage] = useState(1);
  const [openAddServer, setOpenAddServer] = useState(false);
  const [openEditServer, setOpenEditServer] = useState(false);
  const [openDeleteServer, setOpenDeleteServer] = useState(false);
  const authToken = useRouteLoaderData('root');
  const dispatch = useDispatch();
  const countServersRunning = server.servers.filter((server) => server.status === 1).length;
  const countServersDown = server.servers.filter((server) => server.status === 0).length;
  const totalPlayers = server.servers.reduce((acc, server) => acc + server.players, 0);

  const handleOpenAddServer = () => {
    setOpenAddServer(true);
  };

  const handleOpenEditServer = () => {
    setOpenEditServer(true);
  };

  const handleOpenDeleteServer = () => {
    setOpenDeleteServer(true);
  };

  return (
    <>
      {openAddServer && <AddServer open={true} setOpenAddServer={setOpenAddServer} />}
      {openEditServer && <EditServer open={true} setOpenEditServer={setOpenEditServer} selectedServer={server.selectedServer} />}
      {openDeleteServer && <DeleteServer open={true} setOpenDeleteServer={setOpenDeleteServer} selectedServer={server.selectedServer} />}
      {/* row 1 */}
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {authToken && (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <Analytics title="Servers Running" count={countServersRunning} color="success.main" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Analytics title="Servers Down" count={countServersDown} color="error.main" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Analytics title="Total Players" count={totalPlayers} color="primary.main" />
            </Grid>
            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
          </>
        )}
        {/* row 2 */}
        <Grid item xs={12} md={7} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Server List</Typography>
            </Grid>
            {authToken && (
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() => handleOpenAddServer()}
                  sx={{ '&:hover': { backgroundColor: 'primary.main', color: 'white' } }}
                >
                  Add Server
                </Button>
              </Grid>
            )}
          </Grid>
          {authToken && (
            <>
              <MainCard sx={{ mt: 2, height: '39.125em' }} content={false}>
                <ServerList itemsPerPage={10} page={serverListPage} servers={server.servers} />
              </MainCard>
              <Pagination
                sx={{ pt: '1em', pb: '1em', display: 'flex', justifyContent: 'center' }}
                variant="outlined"
                color="primary"
                count={Math.ceil(server.servers.length / 10)}
                onChange={(e, value) => setServerListPage(value)}
              />
            </>
          )}
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Server Info</Typography>
            </Grid>
            <Grid item />
          </Grid>
          {authToken && (
            <MainCard sx={{ mt: 2, height: '9.75em' }}>
              <Stack spacing={3}>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Stack>
                      <Typography variant="h5" noWrap>
                        {server.selectedServer.id ? server.selectedServer.game : 'No Server Selected'}
                      </Typography>
                      <Typography color="secondary" noWrap>
                        {server.selectedServer.id && server.selectedServer.name}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
              <Box sx={{ pt: 2.25 }}>
                <Stack direction="row" spacing={2}>
                  {server.selectedServer.id ? (
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        textTransform: 'capitalize',
                        backgroundColor: server.selectedServer.status ? 'error.main' : 'primary.main',
                        ':hover': { backgroundColor: server.selectedServer.status ? 'error.dark' : 'primary.dark' }
                      }}
                      onClick={() => dispatch(setServerStatus())}
                    >
                      {server.selectedServer.status === 0 ? 'Start' : 'Stop'} Server
                    </Button>
                  ) : null}
                  {server.selectedServer.id ? (
                    <>
                      <Button
                        disabled={!!server.selectedServer.status}
                        size="small"
                        variant="contained"
                        sx={{ textTransform: 'capitalize' }}
                        onClick={() => handleOpenEditServer()}
                      >
                        Edit
                      </Button>
                      <Button
                        disabled={!!server.selectedServer.status}
                        size="small"
                        variant="contained"
                        sx={{ textTransform: 'capitalize', backgroundColor: 'error.main', '&:hover': { backgroundColor: 'error.dark' } }}
                        onClick={() => handleOpenDeleteServer()}
                      >
                        Delete Server
                      </Button>
                    </>
                  ) : null}
                </Stack>
              </Box>
            </MainCard>
          )}
          {authToken && (
            <>
              <MainCard sx={{ mt: 2, height: '28.25em' }} content={false}>
                {backupNotifications.length === 0 ? (
                  <Typography variant="h5" noWrap sx={{ pl: '1.25em', pt: '1em' }}>
                    No notifications available
                  </Typography>
                ) : (
                  <BackupNotification itemsPerPage={5} page={BackupNotificationPage} backupNotifications={backupNotifications} />
                )}
              </MainCard>
              <Pagination
                sx={{ pt: '1em', pb: '1em', display: 'flex', justifyContent: 'center' }}
                variant="outlined"
                color="primary"
                count={Math.ceil(server.servers.length / 10)}
                onChange={(e, value) => setBackupNotificationPage(value)}
              />
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardDefault;
