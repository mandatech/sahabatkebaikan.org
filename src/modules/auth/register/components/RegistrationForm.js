/* eslint-disable no-useless-escape */
import { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import FacebookIcon from 'assets/icons/facebook_icon.svg';
import GoogleIcon from 'assets/icons/google_icon.svg';
import DividerWithText from 'components/DividerWithText';
import Link from 'components/Link';
import Loading from 'components/Loading';
import { registerWithUsernameOrEmailPassword } from 'services/auth.service';

const useStyles = makeStyles(() => ({
  form: {
    '& > *': {
      margin: '8px 0',
    },
  },
  button: {
    flexGrow: 1,
    marginTop: 8,
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const TextField = (props) => (
  <FormikTextField variant="filled" size="small" fullWidth {...props} />
);

const RegistrationForm = () => {
  const classes = useStyles();
  const router = useRouter();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const handleRegister = async (values, { setSubmitting }) => {
    try {
      setIsLoading(true);
      await registerWithUsernameOrEmailPassword(
        values.full_name,
        values.username,
        values.email,
        values.phone,
        values.password
      );

      setAlertSeverity('info');
      setAlertMessage('Register berhasil. Silahkan login.');
      setOpenAlert(true);
      setSubmitting(false);
      setIsLoading(false);

      setTimeout(() => {
        if (router.query.redirect) {
          router.push(`/login?redirect=${window.location.search.slice(10)}`);
        } else {
          router.push('/login');
        }
      }, 1200);
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
      setSubmitting(false);
      setOpenAlert(true);
      setAlertSeverity('error');
      if (error.response) {
        console.log(error.response.data);
        setAlertMessage(error.response.data.message);
      } else if (error.request) {
        console.log(error.request);
        setAlertMessage('Network Error');
      } else {
        console.log('Error', error.message);
        setAlertMessage(error.message);
      }
    }
  };

  return (
    <Box display="flex" flexDirection="column" mt={4} p={1}>
      <Formik
        initialValues={{
          full_name: '',
          username: '',
          phone: '',
          email: '',
          password: '',
          retype_password: '',
        }}
        validate={(values) => {
          const errors = {};

          if (!values.full_name) {
            errors.full_name = 'Harus diisi';
          }

          if (!values.username) {
            errors.username = 'Harus diisi';
          }

          if (!values.phone) {
            errors.phone = 'Harus diisi';
          } else if (!/\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/g.test(values.phone)) {
            errors.phone = 'Nomor telepon tidak valid';
          }

          if (!values.email) {
            errors.email = 'Harus diisi';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = 'Alamat email tidak valid';
          }

          if (!values.password) {
            errors.password = 'Harus diisi';
          } else if (values.password.length < 8) {
            errors.password = 'Password minimal 8 karakter';
          }

          if (!values.retype_password) {
            errors.retype_password = 'Harus diisi';
          }
          if (values.retype_password !== values.password) {
            errors.retype_password = 'Password tidak sama';
          }
          return errors;
        }}
        onSubmit={handleRegister}
      >
        {({ submitForm, isSubmitting }) => (
          <Form className={classes.form}>
            <Field
              component={TextField}
              name="full_name"
              type="text"
              label="Nama Lengkap"
            />
            <Field
              component={TextField}
              name="username"
              type="text"
              label="Username"
            />
            <Field
              component={TextField}
              name="email"
              type="email"
              label="Email"
            />
            <Field
              component={TextField}
              name="phone"
              type="text"
              label="Nomor telepon"
            />
            <Field
              component={TextField}
              type="password"
              label="Password"
              name="password"
            />
            <Field
              component={TextField}
              type="password"
              label="Masukkan Ulang Password"
              name="retype_password"
            />
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              disabled={isSubmitting}
              type="submit"
              onClick={submitForm}
            >
              {isSubmitting && (
                <CircularProgress size={20} style={{ marginRight: 8 }} />
              )}
              Daftar
            </Button>
          </Form>
        )}
      </Formik>

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
            <FacebookIcon style={{ width: 18, height: 18, borderRadius: 2 }} />
          }
        >
          Facebook
        </Button>
      </Box>
      <Link href="/syarat-dan-ketentuan" style={{ textAlign: 'center' }}>
        Dengan mendaftar, kamu setuju dengan Syarat dan Ketentuan penggunaan
        Sahabatkebaikan.org
      </Link>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Loading open={isLoading} onClose={() => setIsLoading(false)} />
    </Box>
  );
};

export default RegistrationForm;
