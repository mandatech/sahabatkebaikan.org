import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import moment from 'moment';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import formatCurrency from 'utils/formatCurrency';

moment.locale('id');

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
    flexDirection: 'column',
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
  paymentLink: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const openInNewTab = (url) => {
  const win = window.open(url, '_blank');
  win.focus();
};

const DonationSummaryScreen = ({ donation }) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Box className={classes.root}>
      <Box className={classes.top}>
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
            <span style={{ fontWeight: 600 }}>
              {donation.campaign.campaigner.full_name}
            </span>
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
            {donation.campaign.title}
          </Typography>
          <Box className={classes.accounNumber}>
            {donation.status === 'pending' ? (
              <>
                <Typography variant="body2" align="center" gutterBottom>
                  Silahkan klik link berikut untuk pembayaran:
                </Typography>
                <Typography
                  className={classes.paymentLink}
                  variant="body1"
                  align="center"
                  color="primary"
                  onClick={() =>
                    openInNewTab(donation.donation_payment.redirect_url)
                  }
                >
                  {donation.donation_payment.redirect_url}
                </Typography>
              </>
            ) : donation.status === 'paid' ? (
              <Typography>Donasi telah dibayar</Typography>
            ) : donation.status === 'expired' ? (
              <Typography>Donasi telah expired</Typography>
            ) : donation.status === 'cancelled' ? (
              <Typography>Donasi telah dibatalkan</Typography>
            ) : (
              <Typography>Donasi telah dibatalkan</Typography>
            )}
          </Box>
          {donation.status === 'pending' && (
            <Box className={classes.paymentLimit}>
              <Typography
                variant="body2"
                align="center"
                style={{ fontSize: 12 }}
              >
                Transfer sebelum{' '}
                <span style={{ fontWeight: 600 }}>
                  {/* {new Date(donation.expiration).toLocaleString()} */}
                  {moment(donation.expiration).format('LL')}{' '}
                  {moment(donation.expiration).format('LT')}
                </span>{' '}
                atau donasi kamu otomatis dibatalkan.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <Box className={classes.totalDonation}>
        <Typography variant="body2" align="center" gutterBottom>
          Total Donasi yang diberikan
        </Typography>
        {donation.status === 'expired' || donation.status === 'cancelled' ? (
          <Typography
            variant="body1"
            align="center"
            color="primary"
            style={{
              fontSize: 24,
              fontWeight: 600,
              textDecoration: 'line-through',
            }}
          >
            Rp {formatCurrency.format(donation.donation_amount)}
          </Typography>
        ) : (
          <Typography
            variant="body1"
            align="center"
            color="primary"
            style={{
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            Rp {formatCurrency.format(donation.donation_amount)}
          </Typography>
        )}
      </Box>

      <Box p={2} display="flex" justifyContent="space-between">
        <Typography variant="body1" style={{ fontSize: 12 }}>
          Invoice: {donation.invoice_number}
        </Typography>
        <Typography variant="body1" style={{ fontSize: 12 }}>
          {/* {new Date(donation.created_at).toLocaleString()} */}
          {moment(donation.created_at).format('LL')}{' '}
          {moment(donation.created_at).format('LT')}
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

DonationSummaryScreen.propTypes = {
  donation: PropTypes.object,
};

export default DonationSummaryScreen;
