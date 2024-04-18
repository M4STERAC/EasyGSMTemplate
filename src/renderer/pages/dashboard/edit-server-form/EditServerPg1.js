import { useContext } from 'react';

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack
  // Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import PropTypes from 'prop-types';
import AnimateButton from '../../../components/@extended/AnimateButton';
import { ServerContext } from '../add-server-form/Context';

// assets
// import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const EditServerPg1 = ({ setPage, setOpenEditServer, selectedServer }) => {
  console.log(selectedServer.game);
  const { updateServerGame, updateServerName, updateServerSavePath, updateServerExecutablePath } = useContext(ServerContext);
  return (
    <>
      <Formik
        initialValues={{
          game: selectedServer.game,
          name: selectedServer.name,
          savePath: selectedServer.savePath,
          executablePath: selectedServer.executablePath,
          banlist: selectedServer.banlist,
          ports: selectedServer.ports,
          submit: null
        }}
        validationSchema={Yup.object().shape({
          game: Yup.string().required('Game is required'),
          name: Yup.string().required('Name is required'),
          savePath: Yup.string()
            .required('Save Path is required')
            .matches(/^([A-Z]:)(\\[a-zA-Z0-9\s\(\)-_\.]+)*$/gm, 'Invalid path'), //eslint-disable-line
          executablePath: Yup.string()
            .required('Executable Path is required')
            .matches(/^([A-Z]:)(\\[a-zA-Z0-9\s\(\)-_\.]+)*$/gm, 'Invalid path') //eslint-disable-line
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            console.log(values.savePath);
            setStatus({ success: true });
            setSubmitting(false);
            updateServerGame(values.game);
            updateServerName(values.name);
            updateServerSavePath(values.savePath);
            updateServerExecutablePath(values.executablePath);
            setPage(2);
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
                  <InputLabel htmlFor="add-game">Game</InputLabel>
                  <OutlinedInput
                    id="add-game"
                    type="text"
                    value={values.game}
                    name="game"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Name of the game the server hosts"
                    fullWidth
                    error={Boolean(touched.game && errors.game)}
                  />
                  {touched.game && errors.game && (
                    <FormHelperText error id="standard-weight-helper-text-add-game">
                      {errors.game}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="add-name">Name</InputLabel>
                  <OutlinedInput
                    id="add-name"
                    type="text"
                    name="name"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter custom name of the server"
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                  />
                  {touched.name && errors.name && (
                    <FormHelperText error id="standard-weight-helper-text-add-name">
                      {errors.name}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="add-save-path">Save Path</InputLabel>
                  <OutlinedInput
                    id="add-save-path"
                    type="text"
                    value={values.savePath}
                    name="savePath"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter path to save path"
                    fullWidth
                    error={Boolean(touched.savePath && errors.savePath)}
                  />
                  {touched.savePath && errors.savePath && (
                    <FormHelperText error id="standard-weight-helper-text-add-save-directory">
                      {errors.savePath}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="add-executablePath">Executable Path</InputLabel>
                  <OutlinedInput
                    id="add-executablePath"
                    type="text"
                    value={values.executablePath}
                    name="executablePath"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter path to executablePath"
                    fullWidth
                    error={Boolean(touched.executablePath && errors.executablePath)}
                  />
                  {touched.executablePath && errors.executablePath && (
                    <FormHelperText error id="standard-weight-helper-text-add-executablePath">
                      {errors.executablePath}
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
                    Next
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

EditServerPg1.propTypes = {
  setPage: PropTypes.func,
  setOpenEditServer: PropTypes.func,
  selectedServer: PropTypes.object
};

export default EditServerPg1;
