import { useDispatch } from 'react-redux';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import FormWrapper from './FormWrapper';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { AddServerContextProvider } from './add-server-form/Context';
import { deleteServer } from '../../store/reducers/server';

//Firebase
import { FireStore } from '../../utils/firebase';

const DeleteServer = ({ setOpenDeleteServer, selectedServer }) => {
  const dispatch = useDispatch();
  const handleDeleteServer = () => {
    FireStore.deleteServer(selectedServer.id);
    dispatch(deleteServer({ id: selectedServer.id }));
    setOpenDeleteServer(false);
  };
  return (
    <AddServerContextProvider>
      <FormWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
              <Typography variant="h3">Confirm Deletion</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Are you sure you want to delete this server?</Typography>
            <Typography variant="h5">This action cannot be undone and all data will be lost.</Typography>
            <Divider sx={{ my: 2 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                sx={{
                  color: 'error.main',
                  backgroundColor: 'transparent',
                  borderColor: 'error.main',
                  '&:hover': { backgroundColor: 'error.main', borderColor: 'error.main', color: 'white' }
                }}
                variant="outlined"
                onClick={() => handleDeleteServer()}
              >
                Confirm
              </Button>
              <Button variant="contained" onClick={() => setOpenDeleteServer(false)}>
                Cancel
              </Button>
            </div>
          </Grid>
        </Grid>
      </FormWrapper>
    </AddServerContextProvider>
  );
};

DeleteServer.propTypes = {
  setOpenDeleteServer: PropTypes.func,
  selectedServer: PropTypes.object
};

export default DeleteServer;
