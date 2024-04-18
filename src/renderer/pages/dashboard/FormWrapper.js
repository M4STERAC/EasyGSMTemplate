import {} from 'react';

//Mui Imports
import Backdrop from '@mui/material/Backdrop';
import Grid from '@mui/material/Grid';

//Project Imports
import FormCard from './FormCard';
import PropTypes from 'prop-types';

const FormWrapper = ({ children }) => {
  return (
    <Backdrop open={true} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1000 }}>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{
          minHeight: '100vh'
        }}
      >
        <Grid item xs={12}>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
          >
            <FormCard>{children}</FormCard>
          </Grid>
        </Grid>
      </Grid>
    </Backdrop>
  );
};

FormWrapper.propTypes = {
  children: PropTypes.node
};

export default FormWrapper;
