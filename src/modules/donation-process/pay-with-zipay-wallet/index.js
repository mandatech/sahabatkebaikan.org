/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import DompetIcon from 'assets/icons/dompet_without_circle.svg';
import PaymentRecap from './components/payment-recap';
import ConfirmPin from './components/confirm-pin';
import ThankyouPage from './components/thankyou';
import { useDonation } from 'context/donation.context';

const useStyles = makeStyles(() => ({
  root: {
    // width: '100%',
  },
  paper: {
    height: '100%',
    maxHeight: 'none',
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <DompetIcon style={{ marginRight: 16 }} />
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
      {/* <Divider /> */}
    </MuiDialogTitle>
  );
});

function PayWithZipayWallet({ open = false, onClose = () => {} }) {
  const classes = useStyles();
  const router = useRouter();
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const theme = useTheme();
  const { donationValue } = useDonation();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={() => setOpenConfirm(true)}
      aria-labelledby="pay-with-zipay-wallet"
      maxWidth="xs"
      fullScreen={fullScreen}
      TransitionComponent={Transition}
      classes={{
        root: classes.root,
        paper: classes.paper,
      }}
      hideBackdrop
    >
      <DialogTitle onClose={() => setOpenConfirm(true)}>
        {step === 1
          ? 'Bayar dengan Zipay Wallet'
          : step === 2
          ? 'Masukkan Pin'
          : 'Pembayaran Berhasil'}
      </DialogTitle>
      {step === 1 ? (
        <PaymentRecap handleClose={handleClose} handleNext={handleNext} />
      ) : step === 2 ? (
        <ConfirmPin handleNext={handleNext} />
      ) : step === 3 ? (
        <ThankyouPage handleClose={handleClose} />
      ) : null}

      <Dialog
        open={openConfirm}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        hideBackdrop
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">
          {step === 1 || (step === 2 && !donationValue.donation_created)
            ? 'Batalkan pembayaran?'
            : step === 2 && donationValue.donation_created
            ? 'Tunda pembayaran?'
            : 'Tutup halaman pembayaran?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {step === 1 || (step === 2 && !donationValue.donation_created)
              ? 'Batalkan proses pembayaran menggunakan Zipay Wallet?'
              : step === 2 && donationValue.donation_created
              ? 'Anda dapat melakukan pembayaran donasi nanti melalui halaman Kebaikanku.'
              : 'Tutup halaman pembayaran?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="primary">
            Tidak
          </Button>
          <Button
            onClick={() => {
              if (step === 2 && donationValue.donation_created) {
                router.push('/kebaikanku');
              } else {
                setOpenConfirm(false);
                setStep(1);
                onClose();
              }
            }}
            color="primary"
            autoFocus
          >
            Ya
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
}

PayWithZipayWallet.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default PayWithZipayWallet;
