import { useState } from 'react';
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
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import EditIcon from '@material-ui/icons/Edit';
import DompetIcon from 'assets/icons/dompet_without_circle.svg';
import { ZipayUserActivation } from 'modules/zipay/user-activation';

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
  const [open, setOpen] = useState(false);
  const [openZipayDialog, setOpenZipayDialog] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

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
        <Typography variant="body1" gutterBottom>
          {profile?.email}
        </Typography>
      </Box>
      <Divider variant="middle" />

      <List component="nav" aria-label="info">
        <ListItem>
          <ListItemIcon>
            <DompetIcon />
          </ListItemIcon>
          <ListItemText primary="Zipay Wallet" />
          <ListItemText style={{ textAlign: 'right', overflow: 'auto' }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setOpenZipayDialog(true)}
            >
              Aktifkan
            </Button>
            {/* <span style={{ fontWeight: 600 }}>
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
              }).format(0)}
            </span> */}
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
