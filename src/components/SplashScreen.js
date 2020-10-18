import Box from '@material-ui/core/Box';
import SahabatkebaikanIcon from 'assets/icons/sahabatkebaikan.svg';

import Loading from './Loading';

const SplashScreen = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <SahabatkebaikanIcon />
      <Loading />
    </Box>
  );
};

export default SplashScreen;
