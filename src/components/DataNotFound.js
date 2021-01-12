import PropTypes from 'prop-types';
const { Box, Typography } = require('@material-ui/core');
import DataNotFoundImage from 'assets/images/DataNotFound.svg';

const DataNotFound = ({
  message = 'Maaf, campaign yang kamu cari tidak ditemukan',
}) => {
  return (
    <Box
      flexGrow={1}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      // border="solid pink 1px"
    >
      <DataNotFoundImage />
      <Typography style={{ marginTop: 16 }} align="center" variant="body2">
        {message}
      </Typography>
    </Box>
  );
};

DataNotFound.propTypes = {
  message: PropTypes.string,
};

export default DataNotFound;
