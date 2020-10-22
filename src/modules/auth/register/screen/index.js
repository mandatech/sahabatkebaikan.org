import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BackIcon from '@material-ui/icons/ChevronLeft';
import SahabatkebaikanIcon from 'assets/icons/sahabatkebaikan.svg';
import { useRouter } from 'next/router';

import RegistrationForm from '../components/RegistrationForm';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // marginBottom: 100,
    padding: 16,
    paddingBottom: 32,
    background: theme.palette.background.paper,
  },
  title: {
    color: theme.palette.primary.main,
    marginLeft: 24,
    fontSize: 18,
    fontWeight: 500,
  },
}));

const RegisterScreen = () => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Box className={classes.root}>
      <Box>
        <Box display="flex">
          <ButtonBase onClick={() => router.back()}>
            <BackIcon color="primary" />
          </ButtonBase>
          <Typography className={classes.title}>Daftar</Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          mt={6}
          style={{ flexGrow: 1 }}
        >
          <SahabatkebaikanIcon style={{ position: 'relative' }} />
        </Box>
      </Box>

      <RegistrationForm />
    </Box>
  );
};

export default RegisterScreen;
