import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import BNIIcon from 'assets/icons/bni_icon.svg';
import SahabatkebaikanIcon from 'assets/icons/sahabatkebaikan.svg';
import { useRouter } from 'next/router';
import React from 'react';
import formatCurrency from 'utils/formatCurrency';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    marginBottom: 50,
  },
  top: {
    margin: 0,
    background: theme.palette.background.paper,
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
    margin: '16px 0 0 0',
    padding: 16,
    background: theme.palette.background.paper,
  },
}));

const DonationSummaryScreen = () => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Box className={classes.root}>
      <Box className={classes.top}>
        <Paper className={classes.logoContainer}>
          <SvgIcon
            component={SahabatkebaikanIcon}
            viewBox="0 0 217 72"
            style={{ width: 135, height: 44 }}
          />
        </Paper>
        <Box p={2} display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h6" gutterBottom>
            Informasi Pembayaran
          </Typography>
          <Typography
            variant="body2"
            align="center"
            gutterBottom
            style={{ fontSize: 12 }}
          >
            Donasi untuk penggalang{' '}
            <span style={{ fontWeight: 600 }}>Baitul MaalKu</span>
          </Typography>
          <Typography
            variant="body2"
            align="center"
            gutterBottom
            style={{ fontSize: 12 }}
          >
            pada Kampanye penggalangan dana
          </Typography>
          <Typography
            variant="body2"
            align="center"
            gutterBottom
            style={{ fontWeight: 600, fontSize: 12 }}
          >
            Bahagiakan Ribuan Mustahiq di Karawang Melalui Zakat Anda
          </Typography>
          <Box className={classes.accounNumber}>
            <BNIIcon />
            <Typography variant="body2" align="center">
              8578755899240880
            </Typography>
            <Button color="secondary">Salin</Button>
          </Box>
          <Box className={classes.paymentLimit}>
            <Typography variant="body2" align="center" style={{ fontSize: 12 }}>
              Transfer sebelum{' '}
              <span style={{ fontWeight: 600 }}>23 Sebtember 2020 19.14</span>{' '}
              atau donasi kamu otomatis dibatalkan.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box className={classes.totalDonation}>
        <Typography variant="body2" align="center" gutterBottom>
          Total Donasi yang diberikan
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="primary"
          style={{ fontSize: 24, fontWeight: 600 }}
        >
          Rp {formatCurrency.format(57500)}
        </Typography>
      </Box>

      <Box p={2} display="flex" justifyContent="space-between">
        <Typography variant="body1" style={{ fontSize: 12 }}>
          Order ID 4217
        </Typography>
        <Typography variant="body1" style={{ fontSize: 12 }}>
          22 September 2020
        </Typography>
      </Box>

      <Box px={2}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          style={{ height: 50 }}
          onClick={() => router.replace('/')}
        >
          Kembali ke Halaman Utama
        </Button>
      </Box>
    </Box>
  );
};

export default DonationSummaryScreen;
