/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
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

  const onSubmit = (value) => {
    handleNext('pin', value.pin);
  };

  return (
    <DialogContent dividers>
      <DialogContentText align="center" style={{ marginTop: 24 }}>
        <Typography gutterBottom variant="h6" color="textPrimary">
          Atur PIN Zipay Wallet
        </Typography>
        <Typography gutterBottom variant="body2">
          Silakan buat 6 digit kode PIN untuk transaksi menggunakan Zipay Wallet
        </Typography>
      </DialogContentText>
      <Formik
        initialValues={{
          pin: '',
          retype_pin: '',
        }}
        validate={(values) => {
          const errors = {};

          if (!values.pin) {
            errors.pin = 'Harus diisi';
          } else if (values.pin.length !== 6) {
            errors.pin = 'Pin harus 6 karakter';
          }

          if (!values.retype_pin) {
            errors.retype_pin = 'Harus diisi';
          }
          if (values.retype_pin !== values.pin) {
            errors.retype_pin = 'Pin tidak sama';
          }
          return errors;
        }}
        onSubmit={onSubmit}
      >
        {({ submitForm, isSubmitting, handleBlur, setFieldValue }) => (
          <Form className={classes.form}>
            <Field
              component={TextField}
              type="password"
              label="Pin"
              name="pin"
              min="0"
              onChange={(e) => {
                e.preventDefault();
                const { value } = e.target;
                const regex = /^(0*[0-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
                if (
                  !value ||
                  (regex.test(value.toString()) && value.length <= 6)
                ) {
                  setFieldValue('pin', value);
                }
              }}
              onBlur={handleBlur}
            />
            <Field
              component={TextField}
              type="password"
              label="Masukkan Ulang Pin"
              name="retype_pin"
              onChange={(e) => {
                e.preventDefault();
                const { value } = e.target;
                const regex = /^(0*[0-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
                if (
                  !value ||
                  (regex.test(value.toString()) && value.length <= 6)
                ) {
                  setFieldValue('retype_pin', value);
                }
              }}
              onBlur={handleBlur}
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
              Lanjut
            </Button>
          </Form>
        )}
      </Formik>
    </DialogContent>
  );
};

export default SetPin;
