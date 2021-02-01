import { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/core/styles';
import DompetIcon from 'assets/icons/dompet.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '8px 16px',
  },
  dompetIcon: {
    marginRight: theme.spacing(2),
  },
  isiSaldo: {
    borderRadius: 8,
    marginLeft: 'auto',
    height: 33,
    width: 90,
  },
}));

const Dompet = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper className={classes.root}>
      <DompetIcon className={classes.dompetIcon} />
      <Box display="flex" flexDirection="column">
        <span style={{ fontWeight: 600 }}>Rp 0</span>
        <span style={{ fontSize: 12, color: '#7D7D7D' }}>Dompet Kebaikan</span>
      </Box>
      <Button
        className={classes.isiSaldo}
        variant="outlined"
        color="primary"
        size="small"
        onClick={() => setOpen(true)}
      >
        Aktifkan
      </Button>
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
    </Paper>
  );
};

export default Dompet;
