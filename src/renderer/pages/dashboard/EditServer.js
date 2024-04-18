import { useState } from 'react';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import EditServerPg1 from './edit-server-form/EditServerPg1';
import EditServerPg2 from './edit-server-form/EditServerPg2';
import FormWrapper from './FormWrapper';
import PropTypes from 'prop-types';
import { AddServerContextProvider } from './add-server-form/Context';

const EditServer = ({ setOpenEditServer, selectedServer }) => {
  const [page, setPage] = useState(1);
  return (
    <AddServerContextProvider>
      <FormWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
              <Typography variant="h3">Edit Server</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            {page === 1 && <EditServerPg1 setPage={setPage} setOpenEditServer={setOpenEditServer} selectedServer={selectedServer} />}
            {page === 2 && <EditServerPg2 setPage={setPage} setOpenEditServer={setOpenEditServer} selectedServer={selectedServer} />}
          </Grid>
        </Grid>
      </FormWrapper>
    </AddServerContextProvider>
  );
};

EditServer.propTypes = {
  setOpenEditServer: PropTypes.func,
  selectedServer: PropTypes.object
};

export default EditServer;
