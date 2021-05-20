import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import Loading from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

import useGetList from 'libs/hooks/useGetList';
import { useRouter } from 'next/router';
import { useDonation } from 'context/donation.context';
import { createDonation } from 'services/donation.service';
import { useToast } from 'libs/toast';
import Loading from 'components/Loading';
import PayWithZipayWallet from '../pay-with-zipay-wallet';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: theme.palette.background.paper,
    '& > *': {
      margin: '8px 0',
    },
  },
  bankIcon: {
    width: 48,
    height: 32,
    objectFit: 'contain',
    borderRadius: 8,
  },
}));

const PaymentMethod = () => {
  const classes = useStyles();
  const router = useRouter();
  const { donationValue, setDonationValue } = useDonation();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openPayWithZipayWallet, setOpenPayWithZipayWallet] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleClosePayWithZipayWallet = () => {
    setOpenPayWithZipayWallet(false);
  };

  const { slug } = router.query;

  const { data, error, isFetching } = useGetList('/payment-methods', {
    _page: 1,
    _pageSize: 10,
    _sort: 'code',
    _order: 'ASC',
    _q: '',
  });

  // console.log('paymentMethod', data);
  const handleSelectPaymentMethod = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
    setDonationValue({
      ...donationValue,
      payment_method: paymentMethod,
    });
    if (paymentMethod.code === 'zipay-wallet') {
      setOpenPayWithZipayWallet(true);
    } else {
      setOpenConfirmDialog(true);
    }
  };

  const handleCreateDonation = async () => {
    handleCloseConfirmDialog();
    setDonationValue({
      ...donationValue,
      payment_method_id: selectedPaymentMethod.id,
    });

    try {
      setIsLoading(true);

      const data = await createDonation(
        donationValue.full_name,
        donationValue.email,
        donationValue.phone,
        donationValue.campaign_id,
        donationValue.donation_amount,
        donationValue.infaq_amount,
        donationValue.is_anonymous,
        donationValue.note,
        selectedPaymentMethod.id
      );

      setIsLoading(false);
      if (data.donation_payment.redirect_url) {
        openInNewTab(data.donation_payment.redirect_url);
      }
      router.push(`/campaign/${slug}/summary/${data.id}`);
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

  const openInNewTab = (url) => {
    const win = window.open(url, '_blank');
    win.focus();
  };

  useEffect(() => {
    if (slug) {
      if (donationValue && !donationValue.campaign_id) {
        router.push(`/campaign/${slug}/donation-amount`);
      }
    }
  }, [slug]);

  return (
    <Box className={classes.root}>
      <Grid container style={{ background: '#DEDEDE', padding: 14, margin: 0 }}>
        <Typography variant="body2">Pilih Metode Pembayaran</Typography>
      </Grid>
      <List component="nav" aria-label="transfer-payment">
        {isFetching ? (
          <Loading open hideBackdrop />
        ) : data?.length ? (
          data.map(
            (paymentMethod) =>
              paymentMethod.is_enabled && (
                <ListItem
                  key={paymentMethod.id}
                  button
                  style={{ paddingLeft: 24 }}
                  onClick={() => handleSelectPaymentMethod(paymentMethod)}
                >
                  <ListItemIcon>
                    <img
                      className={classes.bankIcon}
                      alt="bank-icon"
                      src={paymentMethod.image}
                    />
                  </ListItemIcon>
                  <Box ml={1}>
                    <Typography variant="body2">
                      {paymentMethod.name === 'QRIS'
                        ? 'QRIS (dapat digunakan di ShopeePay, OVO, Gopay, DANA, dll)'
                        : paymentMethod.name}
                      {/* via{' '}
                      {paymentMethod.payment_gateway.name} */}
                    </Typography>
                    {/* <Typography variant="caption" color="textSecondary">
                  Bayar dengan saldo Dompet Kebaikan Anda
                </Typography> */}
                  </Box>
                </ListItem>
              )
          )
        ) : error ? (
          <p style={{ color: 'red' }}>{error.message}</p>
        ) : (
          <p>Maaf, belum ada campaign tersedia.</p>
        )}
      </List>

      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        maxWidth="xs"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{`Anda yakin membayar dengan ${selectedPaymentMethod?.name} via ${selectedPaymentMethod?.payment_gateway?.name}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Anda tidak dapat mengubah cara pembayaran setelah memilihnya.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>Ganti</Button>
          <Button
            onClick={handleCreateDonation}
            variant="contained"
            color="secondary"
          >
            Ya
          </Button>
        </DialogActions>
      </Dialog>

      <PayWithZipayWallet
        open={openPayWithZipayWallet}
        onClose={handleClosePayWithZipayWallet}
      />

      <Loading open={isLoading} hideBackdrop />
    </Box>
  );
};

export default PaymentMethod;
