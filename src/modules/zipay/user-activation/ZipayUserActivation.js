/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { Field, Form, Formik } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';
import DompetIcon from 'assets/icons/dompet_without_circle.svg';
import SetPin from './components/SetPin';
import InputPhone from './components/InputPhone';
import OtpVerification from './components/OtpVerification';

const useStyles = makeStyles(() => ({
  root: {
    // display: 'flex',
    // flexDirection: 'column',
    // // alignItems: 'end',
    // justifyContent: 'flex-end',
    // maxWidth: 446,
    width: '100%',
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

export function ZipayUserActivation({ open = false, onClose = () => {} }) {
  const classes = useStyles();
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNext = () => setStep(step + 1);

  return (
    <Dialog
      fullWidth
      open={open}
      // onClose={onClose}
      onClose={() => setOpenConfirm(true)}
      aria-labelledby="form-dialog-title"
      maxWidth="xs"
      fullScreen={fullScreen}
      TransitionComponent={Transition}
      // keepMounted
      classes={{
        root: classes.root,
        paper: classes.paper,
      }}
      hideBackdrop
    >
      <DialogTitle id="form-dialog-title" onClose={() => setOpenConfirm(true)}>
        Aktivasi Zipay Wallet
      </DialogTitle>
      {step === 1 ? (
        <SetPin handleNext={handleNext} />
      ) : step === 2 ? (
        <InputPhone handleNext={handleNext} />
      ) : step === 3 ? (
        <OtpVerification />
      ) : null}

      <Dialog
        open={openConfirm}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        hideBackdrop
        // maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">
          {'Batalkan proses aktivasi Zipay Wallet?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Batalkan proses aktivasi Zipay Wallet?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="primary">
            Tidak
          </Button>
          <Button
            onClick={() => {
              setOpenConfirm(false);
              setStep(1);
              onClose();
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
