import { useContext } from 'react';
import { useDispatch } from 'react-redux';

// material-ui
import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import PropTypes from 'prop-types';
import AnimateButton from '../../../components/@extended/AnimateButton';
import { updateServer } from '../../../store/reducers/server';
import { ServerContext } from '../add-server-form/Context';

//Firebase
import { FireStore } from '../../../utils/firebase';

const EditServerPg2 = ({ selectedServer, setOpenEditServer }) => {
  const dispatch = useDispatch();
  const { state } = useContext(ServerContext);

  const validateBanlist = (string) => {
    const banlist = string.split(',').map((ip) => ip.trim());
    const ipRegexp = new RegExp(
      /^((\d{1,2}|0\d{0,2}|1\d{0,2}|2[0-4]\d|2[0-5][0-5])\.(\d{1,2}|0\d{0,2}|1\d{0,2}|2[0-4]\d|2[0-5][0-5])\.(\d{1,2}|0\d{0,2}|1\d{0,2}|2[0-4]\d|2[0-5][0-5])\.(\d{1,2}|0\d{0,2}|1\d{0,2}|2[0-4]\d|2[0-5][0-5]))$/
    );
    if (!banlist || banlist.length === 0) return true;
    for (let i = 0; i < banlist.length; i++) {
      console.log(banlist[i]);
      if (banlist[i] === '') continue;
      if (ipRegexp.test(banlist[i])) continue;
      return false;
    }
    return true;
  };

  const validatePorts = (string) => {
    const ports = string.split(',').map((port) => +port.trim());
    if (ports.length === 0) return true;
    for (let i = 0; i < ports.length; i++) {
      if (ports[i] < 0 || ports[i] > 65535 || !Number.isInteger(ports[i])) return false;
    }
    return true;
  };
  return (
    <>
      <Formik
        initialValues={{
          game: selectedServer.game,
          name: selectedServer.name,
          savePath: selectedServer.savePath,
          executablePath: selectedServer.executablePath,
          banlist: selectedServer.banlist.join(','),
          ports: selectedServer.ports.join(','),
          submit: null
        }}
        validationSchema={Yup.object().shape({
          banlist: Yup.string(),
          ports: Yup.string().required('Ports is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const banlistIsValid = validateBanlist(values.banlist);
            if (!banlistIsValid) throw new Error('Invalid IP address');
            const portsAreValid = validatePorts(values.ports);
            if (!portsAreValid) throw new Error('Invalid ports');
            const banlist = values.banlist.split(',').map((ip) => ip.trim());
            const ports = values.ports.split(',').map((port) => +port.trim());
            const server = { id: selectedServer.id, ...state, banlist, ports };

            dispatch(updateServer({ server }));
            setOpenEditServer(false);
            FireStore.updateServer(server);

            setStatus({ success: true });
            setSubmitting(false);
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="add-banlist">Banlist</InputLabel>
                  <OutlinedInput
                    id="add-banlist"
                    type="text"
                    value={values.banlist}
                    name="banlist"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter list of comma-separated-banned IPs"
                    fullWidth
                    error={Boolean(touched.banlist && errors.banlist)}
                  />
                  {touched.banlist && errors.banlist && (
                    <FormHelperText error id="standard-weight-helper-text-add-banlist">
                      {errors.banlist}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="add-ports">Ports</InputLabel>
                  <OutlinedInput
                    id="add-ports"
                    type="text"
                    value={values.ports}
                    name="ports"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter list of comma-separated-required ports"
                    fullWidth
                    error={Boolean(touched.ports && errors.ports)}
                  />
                  {touched.ports && errors.ports && (
                    <FormHelperText error id="standard-weight-helper-text-add-ports">
                      {errors.ports}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Update Server
                  </Button>
                </AnimateButton>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    sx={{ mt: '1em' }}
                    size="large"
                    variant="outlined"
                    color="primary"
                    onClick={() => setOpenEditServer(false)}
                  >
                    Cancel
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

EditServerPg2.propTypes = {
  selectedServer: PropTypes.object,
  setOpenEditServer: PropTypes.func
};

export default EditServerPg2;
