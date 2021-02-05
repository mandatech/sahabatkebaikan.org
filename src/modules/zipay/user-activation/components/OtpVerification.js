/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Field, Form, Formik } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';

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

const SetPin = ({ handleNext = () => {} }) => {
  const classes = useStyles();
  const [successMessage, setSuccessMessage] = React.useState();
  const [errorMessage, setErrorMessage] = React.useState();

  return (
    <DialogContent dividers>
      <DialogContentText align="center" style={{ marginTop: 24 }}>
        <Typography gutterBottom variant="h6" color="textPrimary">
          Verifikasi Kode OTP
        </Typography>
        <Typography gutterBottom variant="body2">
          Masukkan 6 digit kode OTP yang telah dikirimkan ke 085712343333.
        </Typography>
      </DialogContentText>
      <Formik
        initialValues={{
          otp: '',
        }}
        validate={(values) => {
          const errors = {};

          console.log('values', values);

          if (!values.phone) {
            errors.phone = 'Harus diisi';
          } else if (values.phone.toString().length < 8) {
            errors.phone = 'Nomor telepon minimal 8 karakter';
          }

          return errors;
        }}
        onSubmit={handleNext}
      >
        {({ submitForm, isSubmitting, handleBlur, setFieldValue }) => (
          <Form className={classes.form}>
            <Field
              component={TextField}
              type="text"
              label="Kode OTP"
              name="otp"
              disabled={!!errorMessage}
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
              <Typography variant="caption" color="error">
                Kirim ulang dalam 00:59
              </Typography>
              <Button
                variant="text"
                color="primary"
                size="small"
                style={{ textTransform: 'capitalize', marginTop: 8 }}
              >
                Kirim ulang
              </Button>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              disabled={isSubmitting || !!errorMessage}
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

export default SetPin;
