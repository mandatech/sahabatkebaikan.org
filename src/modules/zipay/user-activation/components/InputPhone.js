/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Field, Form, Formik } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';
import { activateZipayAccount } from 'services/zipay.service';
import { useToast } from 'libs/toast';

const useStyles = makeStyles(() => ({
  form: {
    '& > *': {
      margin: '8px 0',
    },
  },
}));

const TextField = (props) => (
  <FormikTextField size="medium" fullWidth {...props} />
);

const SetPin = ({ handleNext = () => {}, state }) => {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = React.useState();
  const [profile, setProfile] = React.useState(null);
  const toast = useToast();

  const onSubmit = async (value) => {
    try {
      await activateZipayAccount(value.phone, state.pin);

      handleNext('phone', value.phone);
    } catch (error) {
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
    }
  };

  React.useEffect(() => {
    const dataLogin = JSON.parse(localStorage.getItem('data_login'));
    setProfile(dataLogin.user);
  }, []);

  return (
    <DialogContent dividers>
      <DialogContentText align="center" style={{ marginTop: 24 }}>
        <Typography gutterBottom variant="h6" color="textPrimary">
          Masukkan Nomor Telepon
        </Typography>
        <Typography gutterBottom variant="body2">
          Masukkan nomor telepon untuk membuat akun Zipay.
        </Typography>
      </DialogContentText>
      {profile && (
        <Formik
          initialValues={{
            phone: profile.phone,
          }}
          validate={(values) => {
            const errors = {};

            if (!values.phone) {
              errors.phone = 'Harus diisi';
            } else if (values.phone.toString().length < 8) {
              errors.phone = 'Nomor telepon minimal 8 karakter';
            }

            return errors;
          }}
          onSubmit={onSubmit}
        >
          {({ submitForm, isSubmitting, handleBlur, setFieldValue }) => (
            <Form className={classes.form} onSubmit={onSubmit}>
              <Field
                component={TextField}
                type="text"
                label="Nomor Telepon"
                name="phone"
                onBlur={handleBlur}
                onChange={(e) => {
                  e.preventDefault();
                  const { value } = e.target;
                  const regex = /^(0*[0-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
                  if (!value || regex.test(value.toString())) {
                    setFieldValue('phone', value);
                  }
                }}
              />
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                disabled={isSubmitting}
                type="submit"
                onClick={submitForm}
                style={{
                  marginTop: 48,
                }}
              >
                {isSubmitting && (
                  <CircularProgress size={20} style={{ marginRight: 8 }} />
                )}
                Kirim OTP
              </Button>
              <Typography color="error" align="center" variant="body2">
                {errorMessage}
              </Typography>
            </Form>
          )}
        </Formik>
      )}
    </DialogContent>
  );
};

SetPin.propTypes = {
  handleNext: PropTypes.func,
  state: PropTypes.object,
};

export default SetPin;
