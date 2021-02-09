import { useState } from 'react';
import Router from 'next/router';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import PhoneIcon from '@material-ui/icons/Phone';
import HelpIcon from 'assets/icons/help_icon.svg';
import LogoutIcon from 'assets/icons/logout_icon.svg';
import SahabatkebaikanLogoIcon from 'assets/icons/sahabatkebaikan_logo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginBottom: 100,
    marginTop: 8,
  },
}));

export default function SimpleList() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('data_login');
    Router.push('/');
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Bantuan" />
        </ListItem>
        <Divider variant="middle" />
        <ListItem button>
          <ListItemIcon>
            <SahabatkebaikanLogoIcon />
          </ListItemIcon>
          <ListItemText
            primary="Tentang Sahabatkebaikan"
            onClick={() => Router.push('/about')}
          />
        </ListItem>
        <Divider variant="middle" />
        <ListItem button>
          <ListItemIcon>
            <PhoneIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Kontak Kami"
            onClick={() => Router.push('/contact')}
          />
        </ListItem>
        <Divider variant="middle" />
        <ListItem button onClick={() => setOpen(true)}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Keluar" />
        </ListItem>
        <Divider variant="middle" />
      </List>
      {/* <Divider variant="middle" /> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{'Yakin ingin keluar?'}</DialogTitle>
        {/* <DialogContent>
          <DialogContentText>Yakin ingin keluar?</DialogContentText>
        </DialogContent> */}

        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Tidak
          </Button>
          <Button onClick={handleLogout}>Yakin</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
