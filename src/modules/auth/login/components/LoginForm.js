import { useState } from 'react';
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
import Loading from 'components/Loading';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { loginWithUsernameOrEmailPassword } from 'services/auth.service';
import { useToast } from 'libs/toast';

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
  }
  // if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //   errors.email = 'Alamat email salah';
  // }
  if (!values.password) {
    errors.password = 'Harus diisi';
  }

  return errors;
};

const LoginForm = () => {
  const classes = useStyles();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleLogin = async (values) => {
    try {
      setIsLoading(true);
      const data = await loginWithUsernameOrEmailPassword(
        values.email,
        values.password
      );

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('data_login', JSON.stringify(data));

      if (router.query.redirect) {
        router.push(window.location.search.slice(10));
      } else {
        router.push('/');
      }

      setIsLoading(false);
    } catch (error) {
      console.log('error', error);
      if (error.response) {
        console.log(error.response.data);
        toast.showMessage(error.response.data.message, 'error');
      } else if (error.request) {
        console.log(error.request);
        toast.showMessage('Network Error', 'error');
      } else {
        console.log('Error', error.message);
        toast.showMessage(error.message, 'error');
      }

      setIsLoading(false);
    }
  };

  const goToRegisterPage = () => {
    if (router.query.redirect) {
      router.push(`/register?redirect=${window.location.search.slice(10)}`);
    } else {
      router.push('/register');
    }
  };

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
        onSubmit={handleLogin}
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

      <Button variant="outlined" fullWidth onClick={goToRegisterPage}>
        Daftar
      </Button>
      <Loading open={isLoading} onClose={() => setIsLoading(false)} />
    </Paper>
  );
};

export default LoginForm;
