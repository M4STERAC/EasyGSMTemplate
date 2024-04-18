import { useState } from 'react';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AddServerPg1 from './add-server-form/AddServerPg1';
import AddServerPg2 from './add-server-form/AddServerPg2';
import FormWrapper from './FormWrapper';
import PropTypes from 'prop-types';
import { AddServerContextProvider } from './add-server-form/Context';

const AddServer = ({ setOpenAddServer }) => {
  const [page, setPage] = useState(1);
  return (
    <AddServerContextProvider>
      <FormWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
              <Typography variant="h3">Add Server</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            {page === 1 && <AddServerPg1 setPage={setPage} setOpenAddServer={setOpenAddServer} />}
            {page === 2 && <AddServerPg2 setPage={setPage} setOpenAddServer={setOpenAddServer} />}
          </Grid>
        </Grid>
      </FormWrapper>
    </AddServerContextProvider>
  );
};

AddServer.propTypes = {
  setOpenAddServer: PropTypes.func
};

export default AddServer;
