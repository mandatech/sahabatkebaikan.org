import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Field, Form, Formik } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';
import Layout from 'components/Layout';
import Header from 'components/Header';
import Loading from 'components/Loading';
import { useToast } from 'libs/toast';

import {
  validatePasswordResetToken,
  resetPassword,
} from 'services/auth.service';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  headerRoot: {
    borderBottom: 'solid 1px lightgrey',
    // borderBottomColor: theme.palette.background.default,
    // boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.25)',
  },
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    padding: 24,
  },
  form: {
    '& > *': {
      margin: '8px 0',
    },
  },
}));

const TextField = (props) => (
  <FormikTextField variant="filled" size="small" fullWidth {...props} />
);

const ResetPasswordPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const { token } = router.query;

  const handleResetPassword = async (values, { setSubmitting }) => {
    try {
      const data = await resetPassword(values.email, values.password, token);

      setSuccessMessage(data.message);
      setSubmitting(false);
    } catch (error) {
      console.log('error', error);
      if (error.response) {
        console.log(error.response.data);
        setErrorMessage(error.response.data.message);
        toast.showMessage(error.response.data.message, 'error');
      } else if (error.request) {
        console.log(error.request);
        setErrorMessage('Network Error');
        toast.showMessage('Network Error', 'error');
      } else {
        console.log('Error', error.message);
        setErrorMessage(error.message);
        toast.showMessage(error.message, 'error');
      }
      setSubmitting(false);
    }
  };

  const handleValidatePasswordResetToken = async (token) => {
    try {
      setLoading(true);
      const data = await validatePasswordResetToken(token);

      console.log('data', data);

      setUser(data.user);

      setTimeout(() => {
        setLoading(false);
      }, [300]);
    } catch (error) {
      console.log('error', error);
      if (error.response) {
        console.log(error.response.data);
        setErrorMessage(error.response.data.message);
        toast.showMessage(error.response.data.message, 'error');
      } else if (error.request) {
        console.log(error.request);
        setErrorMessage('Network Error');
        toast.showMessage('Network Error', 'error');
      } else {
        console.log('Error', error.message);
        setErrorMessage(error.message);
        toast.showMessage(error.message, 'error');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      handleValidatePasswordResetToken(token);
    }
  }, [token]);

  return (
    <Layout
      header={
        <Header
          title="Reset Password"
          // icon={<BackIcon />}
          backButton={true}
          // TitleProps={{ align: 'left' }}
          color="inherit"
          elevation={0}
          classes={{
            root: classes.headerRoot,
          }}
        />
      }
    >
      <Box className={classes.root}>
        {loading ? (
          <Loading open={loading} hideBackdrop />
        ) : successMessage ? (
          <div>
            <Typography
              style={{ marginBottom: 24 }}
              color="primary"
              align="center"
              variant="body1"
            >
              {successMessage}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => router.push('/login')}
            >
              Login
            </Button>
          </div>
        ) : (
          <Formik
            initialValues={{
              email: user?.email,
              password: '',
              retype_password: '',
            }}
            validate={(values) => {
              const errors = {};

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
            onSubmit={handleResetPassword}
          >
            {({ submitForm, isSubmitting }) => (
              <Form className={classes.form}>
                <Field
                  component={TextField}
                  name="email"
                  type="email"
                  label="Email"
                  disabled
                />
                <Field
                  component={TextField}
                  type="password"
                  label="Password Baru"
                  name="password"
                  disabled={!!errorMessage}
                />
                <Field
                  component={TextField}
                  type="password"
                  label="Masukkan Ulang Password"
                  name="retype_password"
                  disabled={!!errorMessage}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  disabled={isSubmitting || !!errorMessage}
                  type="submit"
                  onClick={submitForm}
                >
                  {isSubmitting && (
                    <CircularProgress size={20} style={{ marginRight: 8 }} />
                  )}
                  Ubah Password
                </Button>
                <Typography color="error" align="center" variant="body2">
                  {errorMessage}
                </Typography>
              </Form>
            )}
          </Formik>
        )}
      </Box>
    </Layout>
  );
};

export default ResetPasswordPage;
