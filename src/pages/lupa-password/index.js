import { useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import BackIcon from '@material-ui/icons/ChevronLeft';
import { Field, Form, Formik } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';
import Layout from 'components/Layout';
import Header from 'components/Header';
import { useToast } from 'libs/toast';

import { requestPasswordResetToken } from 'services/auth.service';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  headerRoot: {
    borderBottom: 'solid 1px lightgrey',
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
  const [successMessage, setSuccessMessage] = useState();

  const handleRequestResetPassword = async (values, { setSubmitting }) => {
    try {
      const data = await requestPasswordResetToken(values.email);

      setSuccessMessage(data.message);
      setSubmitting(false);
    } catch (error) {
      if (error.response) {
        toast.showMessage(error.response.data.message, 'error');
      } else if (error.request) {
        toast.showMessage('Network Error', 'error');
      } else {
        toast.showMessage(error.message, 'error');
      }
      setSubmitting(false);
    }
  };

  return (
    <Layout
      header={
        <Header
          title="Lupa Password"
          icon={<BackIcon />}
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
        {successMessage ? (
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
              Kembali
            </Button>
          </div>
        ) : (
          <Formik
            initialValues={{
              email: '',
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

              return errors;
            }}
            onSubmit={handleRequestResetPassword}
          >
            {({ submitForm, isSubmitting }) => (
              <Form className={classes.form}>
                <Field
                  component={TextField}
                  name="email"
                  type="email"
                  label="Email"
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
                  Ubah Password Saya
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </Box>
    </Layout>
  );
};

export default ResetPasswordPage;
