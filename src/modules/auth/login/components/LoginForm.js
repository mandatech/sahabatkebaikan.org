import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FacebookIcon from 'assets/icons/facebook_icon.svg';
import GoogleIcon from 'assets/icons/google_icon.svg';
import Link from 'components/Link';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

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

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Harus diisi';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Alamat email salah';
  }
  if (!values.password) {
    errors.password = 'Harus diisi';
  }

  return errors;
};

const LoginForm = () => {
  const classes = useStyles();
  const router = useRouter();

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

      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validate={validate}
        onSubmit={(values) => {
          // alert(JSON.stringify(values, null, 2));
          console.log(values);
          setTimeout(() => {
            router.push('/');
          }, 1300);
        }}
      >
        {(formik) => (
          <form
            className={classes.form}
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}
          >
            <TextField
              id="username"
              label="Username / Email"
              variant="filled"
              fullWidth
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && formik.errors.email ? true : false}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="filled"
              fullWidth
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={
                formik.touched.password && formik.errors.password ? true : false
              }
              helperText={formik.touched.password && formik.errors.password}
            />
            <Link href="/lupa-password" style={{ float: 'right' }}>
              Lupa Password?
            </Link>

            <Button
              variant="contained"
              color="secondary"
              fullWidth
              style={{ margin: '8px 0' }}
              disabled={formik.isSubmitting}
              type="submit"
            >
              {formik.isSubmitting && (
                <CircularProgress size={20} style={{ marginRight: 8 }} />
              )}
              Masuk
            </Button>
          </form>
        )}
      </Formik>

      <Button
        variant="outlined"
        fullWidth
        onClick={() => router.push('/register')}
      >
        Daftar
      </Button>
    </Paper>
  );
};

export default LoginForm;
