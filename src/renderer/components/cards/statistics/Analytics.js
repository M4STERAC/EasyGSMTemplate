import PropTypes from 'prop-types';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// import { CheckCircleOutlined, UserOutlined, CloseCircleOutlined } from '@ant-design/icons';

// project import
import MainCard from '../../../components/MainCard';

// ==============================|| STATISTICS - Analytics CARD  ||============================== //

const Analytics = ({ title, count, color }) => (
  <MainCard contentSX={{ p: 2.25 }}>
    <Stack spacing={0.5}>
      <Typography variant="h6" color="textPrimary">
        {title}
      </Typography>
      <Grid container alignItems="center">
        <Grid item>
          <Typography variant="h4" color={color}>
            {count}
          </Typography>
        </Grid>
        {/* <Grid item>
          {icon === 'running' ? <CheckCircleOutlined sx={{ color: color }} /> : null}
          {icon === 'down' ? <CloseCircleOutlined sx={{ color: color }} /> : null}
          {icon === 'player' ? <UserOutlined sx={{ color: color }} /> : null}
        </Grid> */}
      </Grid>
    </Stack>
  </MainCard>
);

Analytics.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
  color: PropTypes.string
};

Analytics.defaultProps = {
  color: 'primary'
};

export default Analytics;
