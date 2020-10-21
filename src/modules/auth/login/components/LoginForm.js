import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FacebookIcon from 'assets/icons/facebook_icon.svg';
import GoogleIcon from 'assets/icons/google_icon.svg';
import Link from 'components/Link';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    padding: 16,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0px 8px 15px 4px rgba(27, 188, 194, 0.42)',
    position: 'relative',
    top: 70,
  },
  button: {
    flexGrow: 1,
    margin: 4,
    marginTop: 8,
  },
  form: {
    '& > *': {
      margin: '8px 0',
    },
  },
}));

const LoginForm = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={2}>
      <Typography
        variant="subtitle2"
        gutterBottom
        style={{ marginTop: 8, textAlign: 'center' }}
      >
        Anda belum melakukan Login Akun
      </Typography>
      <Divider
        style={{
          width: '100%',
          background: 'black',
          height: 1,
          marginBottom: 8,
        }}
      />
      <Typography
        variant="body2"
        color="textSecondary"
        gutterBottom
        style={{ textAlign: 'center' }}
      >
        Metode yang direkomendasikan
      </Typography>
      <Box display="flex" justifyContent="space-between" width="100%" mb={2}>
        <Button
          variant="outlined"
          className={classes.button}
          startIcon={<GoogleIcon style={{ width: 18, height: 18 }} />}
        >
          Google
        </Button>
        <Button
          variant="outlined"
          className={classes.button}
          startIcon={
            <FacebookIcon style={{ width: 18, height: 18, borderRadius: 2 }} />
          }
        >
          Facebook
        </Button>
      </Box>

      <Typography variant="body2" color="textSecondary" gutterBottom>
        Atau
      </Typography>

      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          id="username"
          label="Username / Email"
          variant="filled"
          fullWidth
        />
        <TextField id="password" label="Password" variant="filled" fullWidth />
      </form>
      <Link href="/lupa-password" style={{ alignSelf: 'flex-end' }}>
        Lupa Password?
      </Link>

      <Button
        variant="contained"
        color="secondary"
        fullWidth
        style={{ margin: '8px 0' }}
      >
        Masuk
      </Button>
      <Button variant="outlined" fullWidth>
        Daftar
      </Button>
    </Paper>
  );
};

export default LoginForm;
