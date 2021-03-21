/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Field, Form, Formik } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';
import { useDonation } from 'context/donation.context';
import { createDonation } from 'services/donation.service';
import { confirmPayment } from 'services/zipay.service';
import { useToast } from 'libs/toast';

const useStyles = makeStyles(() => ({
  form: {
    '& > *': {
      margin: '8px 0',
    },
  },
  actionButton: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    width: '100%',
    // border: 'solid pink 1px',
  },
}));

const TextField = (props) => (
  <FormikTextField size="medium" fullWidth {...props} />
);

const ConfirmPin = ({ handleNext = () => {} }) => {
  const classes = useStyles();
  const router = useRouter();
  const toast = useToast();
  const { donationValue, setDonationValue } = useDonation();
  const [isLoading, setIsLoading] = useState(false);
  const [donation, setDonation] = useState(null);

  const onSubmit = async (values) => {
    // handleNext('pin', value.pin);
    try {
      setIsLoading(true);
      let donationCreated = donation;

      if (!donation) {
        donationCreated = await createDonation(
          donationValue.campaign_id,
          donationValue.donation_amount,
          donationValue.infaq_amount,
          donationValue.is_anonymous,
          donationValue.note,
          donationValue.paymentMethod.id
        );

        setDonation(donationCreated);
      }

      await confirmPayment(
        donationCreated.donation_payment.inquiry_id,
        values.pin
      );

      setIsLoading(false);
      setDonationValue({
        ...donationValue,
        donationCreated,
      });
      handleNext();
      // router.push(
      //   `/campaign/${donationValue.campaign.slug}/summary/${donationCreated.id}`
      // );
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

  return (
    <DialogContent dividers>
      {/* <DialogContentText align="center" style={{ marginTop: 16 }}>
        
      </DialogContentText> */}
      {/* <Box alignItems="center"> */}
      <Typography gutterBottom variant="h6" color="textPrimary" align="center">
        Masukkan PIN Zipay Wallet
      </Typography>
      <Typography gutterBottom variant="body2" align="center">
        Silakan masukkan 6 digit PIN akun Zipay Anda untuk membayar donasi
        menggunakan Zipay Wallet
      </Typography>
      {/* </Box> */}

      <Formik
        initialValues={{
          pin: '',
        }}
        validate={(values) => {
          const errors = {};

          if (!values.pin) {
            errors.pin = 'Harus diisi';
          } else if (values.pin.length !== 6) {
            errors.pin = 'Pin harus 6 karakter';
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

            <Box className={classes.actionButton} px={2}>
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
                Bayar
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </DialogContent>
  );
};

export default ConfirmPin;
