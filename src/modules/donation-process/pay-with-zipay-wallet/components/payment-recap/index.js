import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import DialogContent from '@material-ui/core/DialogContent';
import formatCurrency from 'utils/formatCurrency';
import { useDonation } from 'context/donation.context';
import { checkBalance } from 'services/zipay.service';
import Loading from 'components/Loading';

const useStyles = makeStyles(() => ({
  top: {
    margin: '0 0 16px 0',
    padding: '0 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoContainer: {
    width: '100%',
    padding: 8,
    marginBottom: 8,
    display: 'flex',
    justifyContent: 'center',
    boxShadow: ' 0px 2px 6px rgba(0, 0, 0, 0.25)',
  },
  accounNumber: {
    width: '100%',
    background: '#EDEDED',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginTop: 16,
  },
  paymentLimit: {
    border: '1px solid #DEDEDE',
    borderRadius: 2,
    boxSizing: 'border-box',
    padding: 16,
    marginTop: 8,
  },
  totalDonation: {
    padding: 16,
  },
  paymentLink: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  zipayLogo: {
    width: 88,
    height: 32,
    objectFit: 'cover',
    borderRadius: 8,
    marginBottom: 8,
  },
  actionButton: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
    // border: 'solid pink 1px',
  },
}));

const PaymentRecap = ({ handleClose = () => {}, handleNext = () => {} }) => {
  const classes = useStyles();
  const router = useRouter();
  const { donationValue } = useDonation();
  const [isLoading, setIsloading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [balance, setBalance] = useState(null);

  const handleCheckBalance = async () => {
    try {
      setIsloading(true);
      setErrorMessage(null);

      const data = await checkBalance();

      setBalance(data.zipay_pocket);
      setIsloading(false);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        setErrorMessage('Network error');
      } else {
        setErrorMessage(error.message);
      }
      setIsloading(false);
    }
  };

  useEffect(() => {
    handleCheckBalance();
  }, []);

  return (
    <DialogContent dividers style={{ padding: '16px 0' }}>
      {isLoading ? (
        <Loading open={isLoading} />
      ) : (
        <>
          <Box
            className={classes.top}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography
              variant="body2"
              align="center"
              gutterBottom
              // style={{ fontSize: 16 }}
            >
              Donasi untuk penggalang{' '}
              <span style={{ fontWeight: 600 }}>
                {donationValue.campaign.campaigner.full_name}
              </span>
            </Typography>
            <Typography
              variant="body2"
              align="center"
              gutterBottom
              // style={{ fontSize: 12 }}
            >
              pada Kampanye penggalangan dana
            </Typography>
            <Typography
              variant="body1"
              align="center"
              gutterBottom
              style={{ fontWeight: 600, fontSize: 18 }}
            >
              {`"${donationValue.campaign.title}"`}
            </Typography>
            <Typography
              variant="body2"
              align="center"
              gutterBottom
              // style={{ fontWeight: 600 }}
            >
              Menggunakan Zipay Wallet
            </Typography>

            <img
              className={classes.zipayLogo}
              src={donationValue.payment_method.image}
              alt="zipay logo"
            />

            {balance >= 0 && !errorMessage ? (
              <>
                <Typography
                  variant="body2"
                  align="center"
                  style={{ marginTop: 16 }}
                >
                  {balance >=
                  donationValue.donation_amount + donationValue.infaq_amount
                    ? 'Saldo Zipay Wallet Anda'
                    : 'Saldo Zipay Wallet Anda tidak cukup'}
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  color="primary"
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: '#FF1313',
                  }}
                >
                  Rp {formatCurrency.format(balance)}
                </Typography>
              </>
            ) : (
              <Typography color="error">{errorMessage}</Typography>
            )}
          </Box>

          <Divider />
          <Box className={classes.totalDonation}>
            <Typography variant="body2" align="center">
              Donasi yang diberikan
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="primary"
              style={{
                fontSize: 18,
                fontWeight: 600,
              }}
              gutterBottom
            >
              Rp {formatCurrency.format(donationValue.donation_amount)}
            </Typography>
            <Typography variant="body2" align="center">
              Infaq
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="primary"
              style={{
                fontSize: 18,
                fontWeight: 600,
              }}
              gutterBottom
            >
              Rp {formatCurrency.format(donationValue.infaq_amount)}
            </Typography>
            <Typography variant="body2" align="center">
              Total yang harus dibayar
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="primary"
              style={{
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              Rp{' '}
              {formatCurrency.format(
                donationValue.donation_amount + donationValue.infaq_amount
              )}
            </Typography>
          </Box>

          <Divider />

          <Box className={classes.actionButton} px={2}>
            {errorMessage ? (
              <Button
                disabled={isLoading}
                variant="contained"
                color="secondary"
                fullWidth
                style={{ height: 50 }}
                onClick={() => handleClose()}
              >
                Ganti Metode Pembayaran
              </Button>
            ) : balance <
              donationValue.donation_amount + donationValue.infaq_amount ? (
              <Grid container spacing={2}>
                <Grid item xs>
                  <Button
                    disabled={isLoading}
                    variant="contained"
                    color="secondary"
                    fullWidth
                    style={{ height: 50 }}
                    onClick={() => handleClose()}
                  >
                    Ganti Metode Pembayaran
                  </Button>
                </Grid>
                <Grid item xs>
                  <Button
                    disabled={isLoading}
                    variant="contained"
                    color="secondary"
                    fullWidth
                    style={{ height: 50 }}
                    onClick={() => router.replace('/zipay')}
                  >
                    Topup
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Button
                disabled={isLoading}
                variant="contained"
                color="secondary"
                fullWidth
                style={{ height: 50 }}
                onClick={() => handleNext()}
              >
                Lanjut
              </Button>
            )}
            {/* {balance >=
            donationValue.donation_amount + donationValue.infaq_amount ? (
              <Button
                disabled={isLoading}
                variant="contained"
                color="secondary"
                fullWidth
                style={{ height: 50 }}
                onClick={() => handleNext()}
              >
                Lanjut
              </Button>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs>
                  <Button
                    disabled={isLoading}
                    variant="contained"
                    color="secondary"
                    fullWidth
                    style={{ height: 50 }}
                    onClick={() => handleClose()}
                  >
                    Ganti Metode Pembayaran
                  </Button>
                </Grid>
                <Grid item xs>
                  <Button
                    disabled={isLoading}
                    variant="contained"
                    color="secondary"
                    fullWidth
                    style={{ height: 50 }}
                    onClick={() => router.replace('/zipay')}
                  >
                    Topup
                  </Button>
                </Grid>
              </Grid>
            )} */}
          </Box>
        </>
      )}
    </DialogContent>
  );
};

export default PaymentRecap;
