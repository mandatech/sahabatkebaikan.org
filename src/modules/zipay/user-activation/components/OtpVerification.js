/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Field, Form, Formik } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';
import Countdown from 'react-countdown';
import { useToast } from 'libs/toast';
import { resendOtp, verifyOtp } from 'services/zipay.service';

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

const OtpVerification = ({ handleClose = () => {}, state }) => {
  const classes = useStyles();
  const toast = useToast();
  const [timer] = React.useState(Date.now() + 30000);
  const [errorMessage, setErrorMessage] = React.useState();

  const refreshPage = () => {
    window.location.reload();
  };

  const onSubmit = async (value) => {
    try {
      await verifyOtp(value.otp);

      toast.showMessage('Zipay account activated', 'info');

      setTimeout(() => {
        refreshPage();
      }, 1000);

      handleClose();
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
        toast.showMessage(error.response.data.message, 'error');
      } else if (error.request) {
        setErrorMessage('Network Error');
        toast.showMessage('Network Error', 'error');
      } else {
        setErrorMessage(error.message);
        toast.showMessage(error.message, 'error');
      }
    }
  };

  const renderer = ({ minutes, seconds, completed, api }) => {
    if (completed) {
      // Render a completed state
      return (
        <Button
          variant="text"
          color="primary"
          size="small"
          style={{ textTransform: 'capitalize', marginTop: 8 }}
          onClick={async () => {
            api.stop();
            try {
              await resendOtp(state.phone);
              api.start();
            } catch (error) {
              if (error.response) {
                setErrorMessage(error.response.data.message);
                toast.showMessage(error.response.data.message, 'error');
              } else if (error.request) {
                setErrorMessage('Network Error');
                toast.showMessage('Network Error', 'error');
              } else {
                setErrorMessage(error.message);
                toast.showMessage(error.message, 'error');
              }
            }
          }}
        >
          Kirim ulang
        </Button>
      );
    } else {
      // Render a countdown
      return (
        <Typography variant="caption" color="error">
          Kirim ulang dalam {minutes}:{seconds}
        </Typography>
      );
    }
  };

  return (
    <DialogContent dividers>
      <DialogContentText align="center" style={{ marginTop: 24 }}>
        <Typography gutterBottom variant="h6" color="textPrimary">
          Verifikasi Kode OTP
        </Typography>
        <Typography gutterBottom variant="body2">
          Masukkan 6 digit kode OTP yang telah dikirimkan ke {state.phone}.
        </Typography>
      </DialogContentText>
      <Formik
        initialValues={{
          otp: '',
        }}
        validate={(values) => {
          const errors = {};

          if (!values.otp) {
            errors.otp = 'Harus diisi';
          } else if (values.otp.toString().length < 6) {
            errors.otp = 'Nomor telepon minimal 6 karakter';
          }

          return errors;
        }}
        onSubmit={onSubmit}
      >
        {({ submitForm, isSubmitting, handleBlur, setFieldValue }) => (
          <Form className={classes.form}>
            <Field
              component={TextField}
              type="text"
              label="Kode OTP"
              name="otp"
              disabled={isSubmitting}
              onBlur={handleBlur}
              onChange={(e) => {
                e.preventDefault();
                const { value } = e.target;
                const regex = /^(0*[0-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
                if (
                  !value ||
                  (regex.test(value.toString()) && value.length <= 6)
                ) {
                  setFieldValue('otp', value);
                }
              }}
            />
            <Box display="flex" flexDirection="column" alignItems="center">
              <Countdown date={timer} renderer={renderer} autoStart={true} />
            </Box>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              disabled={isSubmitting}
              type="submit"
              onClick={submitForm}
              // style={{
              //   marginTop: 48,
              // }}
            >
              {isSubmitting && (
                <CircularProgress size={20} style={{ marginRight: 8 }} />
              )}
              Verifikasi
            </Button>
            <Typography color="error" align="center" variant="body2">
              {errorMessage}
            </Typography>
          </Form>
        )}
      </Formik>
    </DialogContent>
  );
};

OtpVerification.propTypes = {
  handleClose: PropTypes.func,
  state: PropTypes.object,
};

export default OtpVerification;
