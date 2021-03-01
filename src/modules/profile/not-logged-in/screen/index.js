import { useRouter } from 'next/router';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'components/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
  },
  avatarBackground: {
    background: 'linear-gradient(270deg, #1BBCC2 0%, #4156A5 100%)',
    opacity: 0.3,
    width: '100%',
    height: 130,
    position: 'absolute',
    overflow: 'hidden',
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      right: '-3%',
      left: '-3%',
      height: 120,
      background: '#fff',
      '-webkit-clip-path': 'ellipse(50% 60% at 50% 100%)',
      'clip-path': 'ellipse(50% 60% at 50% 100%)',
    },
  },
  avatarContainer: {
    position: 'relative',
    top: 20,
  },
  avatar: {
    width: 115,
    height: 115,
  },
}));

const NotLoggedInScreen = () => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Box className={classes.root}>
      <Box style={{ position: 'relative' }}>
        <Box className={classes.avatarBackground}></Box>

        <Box
          display="flex"
          justifyContent="center"
          className={classes.avatarContainer}
        >
          <Avatar alt="avatar" className={classes.avatar} />
        </Box>
      </Box>

      <Box m={2} mt={4}>
        <Typography>
          Anda belum masuk. <br /> Silahkan masuk untuk menikmati kemudahan
          berdonasi di Sahabatkebaikan!
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => router.push('/login?redirect=/profil')}
          fullWidth
          style={{ marginTop: 12 }}
        >
          Masuk Sekarang
        </Button>
        <Typography align="center" variant="body2" style={{ marginTop: 12 }}>
          Belum punya akun?{' '}
          <Link href="/register?redirect=/profil">Daftar</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default NotLoggedInScreen;
