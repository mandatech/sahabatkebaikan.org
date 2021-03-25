import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DompetIcon from 'assets/icons/dompet_without_circle.svg';
import { ZipayUserActivation } from 'modules/zipay/user-activation';
import { checkBalance } from 'services/zipay.service';
import formatCurrency from 'utils/formatCurrency';
import { requestEmailVerificationToken } from 'services/auth.service';
import { useToast } from 'libs/toast';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
  },
  avatarBackground: {
    background: 'linear-gradient(270deg, #1BBCC2 0%, #4156A5 100%)',
    opacity: 0.3,
    width: '100%',
    height: 130,
    position: 'absolute',
    overflow: 'hidden',
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      right: '-3%',
      left: '-3%',
      height: 120,
      background: '#fff',
      '-webkit-clip-path': 'ellipse(50% 60% at 50% 100%)',
      'clip-path': 'ellipse(50% 60% at 50% 100%)',
    },
  },
  avatarContainer: {
    position: 'relative',
    top: 20,
  },
  avatar: {
    width: 115,
    height: 115,
  },
}));

const ProfileInfo = ({ profile }) => {
  const classes = useStyles();
  const router = useRouter();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [openZipayDialog, setOpenZipayDialog] = useState(false);

  const [isLoading, setIsloading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isRequested, setIsRequested] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckBalance = async () => {
    try {
      setIsloading(true);
      setErrorMessage(null);
      const data = await checkBalance();

      setBalance(data.zipay_pocket);
      setIsloading(false);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        console.log(error.request);
        setErrorMessage('Network error');
      } else {
        console.log('Error', error.message);
        setErrorMessage(error.message);
      }
      setIsloading(false);
    }
  };

  const handleRequestEmailVerification = async () => {
    try {
      setIsRequesting(true);
      setErrorMessage(null);
      await requestEmailVerificationToken(profile.email);

      setIsRequested(true);
      setIsRequesting(false);
      toast.showMessage(
        `Permintaan verifikasi email telah dikirim ke ${profile.email}`
      );
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        toast.showMessage(error.response.data.message, 'error');
      } else if (error.request) {
        console.log(error.request);
        toast.showMessage('Network error', 'error');
      } else {
        console.log('Error', error.message);
        toast.showMessage(error.message, 'error');
      }
      setIsRequesting(false);
    }
  };

  useEffect(() => {
    handleCheckBalance();
  }, []);

  return (
    <Box className={classes.root}>
      <Box style={{ position: 'relative' }}>
        <Box className={classes.avatarBackground}></Box>
        <Button
          color="primary"
          size="small"
          startIcon={<EditIcon />}
          style={{ position: 'absolute', top: 16, right: 8, zIndex: 2 }}
          onClick={() => router.push('/profil/edit')}
        >
          Ubah
        </Button>
        <Box
          display="flex"
          justifyContent="center"
          className={classes.avatarContainer}
        >
          <Avatar
            alt="Cindy Baker"
            src={profile?.profile_photo}
            className={classes.avatar}
          />
        </Box>
      </Box>
      <Box m={2} mt={4}>
        <Typography variant="body1" color="textSecondary">
          Nama Lengkap
        </Typography>
        <Typography variant="body1" gutterBottom>
          {profile?.full_name}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Username
        </Typography>
        <Typography variant="body1" gutterBottom>
          {profile?.username}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          No Telepon
        </Typography>
        <Typography variant="body1" gutterBottom>
          {profile?.phone || '-'}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Email
        </Typography>
        <Box display="flex">
          <Typography variant="body1" gutterBottom style={{ marginRight: 8 }}>
            {profile?.email}{' '}
          </Typography>
          {!profile?.verified_at ? (
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              disabled={isRequesting || isRequested}
              onClick={handleRequestEmailVerification}
            >
              {isRequesting && <CircularProgress size={15} color="inherit" />}
              Verifikasi
            </Button>
          ) : (
            <CheckCircleIcon color="secondary" />
          )}
        </Box>
      </Box>
      <Divider variant="middle" />

      <List
        component="nav"
        aria-label="info"
        onClick={() => balance !== null && router.push('/zipay')}
        style={{
          cursor: balance !== null && 'pointer',
        }}
      >
        <ListItem>
          <ListItemIcon>
            <DompetIcon />
          </ListItemIcon>
          <ListItemText
            primary="Zipay Wallet"
            secondary={
              errorMessage && errorMessage !== 'Zipay Account is not activated'
                ? 'Error'
                : null
            }
          />
          <ListItemText style={{ textAlign: 'right', overflow: 'auto' }}>
            {isLoading ? (
              <CircularProgress size={20} />
            ) : errorMessage === 'Zipay Account is not activated' ? (
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setOpenZipayDialog(true)}
              >
                Aktifkan
              </Button>
            ) : balance !== null ? (
              <span style={{ fontWeight: 600 }}>
                Rp {formatCurrency.format(balance)}
              </span>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleCheckBalance()}
              >
                Reload
              </Button>
            )}
          </ListItemText>
        </ListItem>
      </List>
      <Dialog
        style={{ marginLeft: -12 }}
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Nantikan!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fitur ini sedang kami kembangkan, doakan agar segera bisa digunakan
            ya!
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Amin
          </Button>
        </DialogActions>
      </Dialog>
      <ZipayUserActivation
        open={openZipayDialog}
        onClose={() => setOpenZipayDialog(false)}
      />
    </Box>
  );
};

ProfileInfo.propTypes = {
  profile: PropTypes.object,
};

export default ProfileInfo;
