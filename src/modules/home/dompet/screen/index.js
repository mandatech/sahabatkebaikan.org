import { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import DompetIcon from 'assets/icons/dompet.svg';
import { ZipayUserActivation } from 'modules/zipay/user-activation';

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
  const [openZipayDialog, setOpenZipayDialog] = useState(false);

  return (
    <Paper className={classes.root}>
      <DompetIcon className={classes.dompetIcon} />
      <Box display="flex" flexDirection="column">
        <span style={{ fontWeight: 600 }}>Rp 0</span>
        <span style={{ fontSize: 12, color: '#7D7D7D' }}>Zipay Wallet</span>
      </Box>
      <Button
        className={classes.isiSaldo}
        variant="outlined"
        color="primary"
        size="small"
        onClick={() => setOpenZipayDialog(true)}
      >
        Aktifkan
      </Button>
      <ZipayUserActivation
        open={openZipayDialog}
        onClose={() => setOpenZipayDialog(false)}
      />
    </Paper>
  );
};

export default Dompet;
