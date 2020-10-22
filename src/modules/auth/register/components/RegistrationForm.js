import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FacebookIcon from 'assets/icons/facebook_icon.svg';
import GoogleIcon from 'assets/icons/google_icon.svg';
import DividerWithText from 'components/DividerWithText';
import Link from 'components/Link';

const useStyles = makeStyles(() => ({
  form: {
    padding: 8,
    '& > *': {
      margin: '8px 0',
    },
  },
  button: {
    flexGrow: 1,
    // margin: 4,
    marginTop: 8,
  },
}));

const RegistrationForm = () => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" mt={4}>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          id="username"
          label="Username"
          variant="filled"
          size="small"
          fullWidth
        />
        <TextField
          id="email"
          label="Email"
          variant="filled"
          size="small"
          fullWidth
        />
        <TextField
          id="phone"
          label="No Telepon"
          variant="filled"
          size="small"
          fullWidth
        />
        <TextField
          id="password"
          label="Password"
          variant="filled"
          type="password"
          size="small"
          fullWidth
        />
        <TextField
          id="password"
          label="Masukkan ulang Password"
          variant="filled"
          type="password"
          size="small"
          fullWidth
        />
        <Button variant="contained" color="secondary" fullWidth>
          Daftar
        </Button>
        <span>
          Sudah terdaftar? <Link href="/login">Login</Link>
        </span>
        <DividerWithText style={{ padding: '0 32px', margin: '12px 0' }}>
          Atau Daftar dengan
        </DividerWithText>
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          mb={2}
          // px={1}
        >
          <Button
            variant="outlined"
            className={classes.button}
            startIcon={<GoogleIcon style={{ width: 18, height: 18 }} />}
            style={{ marginRight: 8 }}
          >
            Google
          </Button>
          <Button
            variant="outlined"
            className={classes.button}
            startIcon={
              <FacebookIcon
                style={{ width: 18, height: 18, borderRadius: 2 }}
              />
            }
          >
            Facebook
          </Button>
        </Box>
      </form>

      <Link href="/syarat-dan-ketentuan" style={{ textAlign: 'center' }}>
        Dengan mendaftar, kamu setuju dengan Syarat dan Ketentuan penggunaan
        Sahabatkebaikan.org
      </Link>
    </Box>
  );
};

export default RegistrationForm;
