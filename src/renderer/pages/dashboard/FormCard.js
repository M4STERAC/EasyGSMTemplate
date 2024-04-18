import PropTypes from 'prop-types';

// material-ui
import { Box } from '@mui/material';

// project import
import MainCard from '../../components/MainCard';

// ==============================|| AUTHENTICATION - CARD WRAPPER ||============================== //

const FormCard = ({ children, ...other }) => (
  <MainCard
    sx={{
      maxWidth: { xs: 400, lg: 475 },
      margin: { xs: 2.5, md: 3 },
      '& > *': {
        flexGrow: 1,
        flexBasis: '50%'
      }
    }}
    content={true}
    {...other}
    border={false}
    boxShadow
  >
    <Box sx={{ p: { xs: 1, sm: 2, md: 2.5, xl: 3 } }}>{children}</Box>
  </MainCard>
);

FormCard.propTypes = {
  children: PropTypes.node
};

export default FormCard;
