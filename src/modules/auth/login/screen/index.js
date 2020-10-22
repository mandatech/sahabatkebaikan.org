import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BackIcon from '@material-ui/icons/ChevronLeft';
import SahabatkebaikanIcon from 'assets/icons/sahabatkebaikan.svg';
import { useRouter } from 'next/router';

import LoginForm from '../components/LoginForm';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // minHeight: '100vh',
    padding: 16,
    paddingBottom: 100,
    background: theme.palette.primary.main,
    // border: 'solid pink 2px',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    '&:before': {
      content: '""',
      position: 'absolute',
      transform: 'rotate(0.5turn)',
      top: 0,
      right: '-30%',
      left: '-30%',
      height: 450,
      overflow: 'hidden',
      background: '#fff',
      '-webkit-clip-path': 'ellipse(50% 60% at 50% 100%)',
      'clip-path': 'ellipse(50% 60% at 50% 100%)',
    },
  },
  title: {
    position: 'relative',
    color: theme.palette.primary.main,
    marginLeft: 24,
    fontSize: 18,
    fontWeight: 500,
  },
}));

const LoginScreen = () => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Box className={classes.root}>
      <Box>
        <Box display="flex">
          <ButtonBase onClick={() => router.back()}>
            <BackIcon color="primary" />
          </ButtonBase>
          <Typography className={classes.title}>Masuk</Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          mt={6}
          style={{ flexGrow: 1 }}
        >
          <SahabatkebaikanIcon style={{ position: 'relative' }} />
        </Box>
        <LoginForm />
      </Box>
    </Box>
  );
};

export default LoginScreen;
