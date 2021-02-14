import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import DompetIcon from 'assets/icons/dompet.svg';
import { ZipayUserActivation } from 'modules/zipay/user-activation';
import { checkBalance } from 'services/zipay.service';
import formatCurrency from 'utils/formatCurrency';

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

  useEffect(() => {
    handleCheckBalance();
  }, []);

  return (
    <Paper className={classes.root}>
      <DompetIcon className={classes.dompetIcon} />
      <Box display="flex" flexDirection="column">
        {isLoading ? (
          <CircularProgress size={15} />
        ) : errorMessage ? (
          <Typography variant="caption" color="error">
            Failed to get balance
          </Typography>
        ) : balance >= 0 ? (
          <span style={{ fontWeight: 600 }}>
            Rp {formatCurrency.format(balance)}
          </span>
        ) : (
          <span style={{ fontWeight: 600 }}>Rp -</span>
        )}
        <span style={{ fontSize: 12, color: '#7D7D7D' }}>Zipay Wallet</span>
      </Box>

      {isLoading ? (
        <CircularProgress style={{ marginLeft: 'auto' }} size={20} />
      ) : errorMessage ? (
        <Button
          className={classes.isiSaldo}
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => handleCheckBalance()}
        >
          Reload
        </Button>
      ) : balance >= 0 ? (
        <Button
          className={classes.isiSaldo}
          variant="outlined"
          color="primary"
          size="small"
          // onClick={() => setOpenZipayDialog(true)}
        >
          Isi Saldo
        </Button>
      ) : (
        <Button
          className={classes.isiSaldo}
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => setOpenZipayDialog(true)}
        >
          Aktifkan
        </Button>
      )}
      <ZipayUserActivation
        open={openZipayDialog}
        onClose={() => setOpenZipayDialog(false)}
      />
    </Paper>
  );
};

export default Dompet;
