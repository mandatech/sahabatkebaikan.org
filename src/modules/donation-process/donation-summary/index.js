import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import moment from 'moment';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import formatCurrency from 'utils/formatCurrency';
import PayWithZipayWallet from '../pay-with-zipay-wallet';
import { useDonation } from 'context/donation.context';
import { getPaymentMethodWithBankDetail } from 'services/payment-method.service';
import { useToast } from 'libs/toast';

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
    marginTop: 8,
  },
  infoBox: {
    width: '100%',
    background: '#EDEDED',
    display: 'flex',
    // flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginTop: 8,
    marginBottom: 16,
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
  const toast = useToast();
  const { donationValue, setDonationValue } = useDonation();
  const [openPayWithZipayWallet, setOpenPayWithZipayWallet] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState({
    id: '48175eaf-a493-456c-bf4b-7a38c38cd626',
    payment_gateway_id: 'dda4a236-878a-47cc-803c-d85c1698b60b',
    code: '7154488949',
    name: 'Bank Syariah Indonesia (BSI)',
    is_enabled: true,
    image:
      'https://i.ibb.co/GncZngP/bank-syariah-indonesia-logo-8-DFA668-CD8-seeklogo-com.png',
    created_at: '2021-04-27 23:09:49',
    payment_gateway: {
      id: 'dda4a236-878a-47cc-803c-d85c1698b60b',
      code: 'moota',
      name: 'Moota',
      is_enabled: true,
      created_at: '2021-01-26 13:35:18',
    },
    bank_detail: {
      username: 'sahabatkebaikan',
      name_holder: 'SAHABAT KEBAIKAN',
      account_number: '7154488949',
      bank_type: 'bsi',
      is_active: true,
      created_at: '2021-04-27 23:09:48',
      bank_id: '',
    },
  });

  const handleGetBankDetail = async (paymentMethodId) => {
    const data = await getPaymentMethodWithBankDetail(paymentMethodId);

    setPaymentMethod(data);
  };

  useEffect(() => {
    setDonationValue({
      ...donationValue,
      campaign: donation.campaign,
      donation_created: donation,
      payment_method: donation.donation_payment?.payment_method,
      donation_amount: donation.donation_amount,
      infaq_amount: donation.infaq_amount,
      is_anonymous: donation.is_anonymous,
      note: donation.note,
      payment_method_id: donation.donation_payment?.payment_method?.id,
    });

    if (
      donation.donation_payment?.payment_method?.payment_gateway.code ===
      'moota'
    ) {
      handleGetBankDetail(donation.donation_payment.payment_method.id);
    }
  }, []);

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

          {donation.status === 'pending' ? (
            donation.donation_payment.payment_method.code === 'zipay-wallet' ? (
              <Box className={classes.accounNumber}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setOpenPayWithZipayWallet(true)}
                >
                  Bayar dengan Zipay Wallet
                </Button>
              </Box>
            ) : donation.donation_payment.payment_method.payment_gateway
                .code === 'moota' ? (
              <div style={{ marginTop: 16 }}>
                <Typography variant="body2">
                  Selesaikan donasi Anda dengan transfer ke rekening atas nama:
                </Typography>
                <Typography variant="body2" style={{ fontWeight: 600 }}>
                  {paymentMethod.bank_detail?.name_holder}
                </Typography>
                <Box className={classes.infoBox}>
                  <Box display="flex" alignItems="center">
                    <img alt="logo-bank" src={paymentMethod.image} />
                    <Typography
                      variant="body1"
                      align="center"
                      style={{ fontWeight: 600, marginLeft: 8 }}
                    >
                      {paymentMethod.bank_detail?.account_number}
                    </Typography>
                  </Box>
                  <Box>
                    <CopyToClipboard
                      text={paymentMethod.bank_detail?.account_number}
                      onCopy={() =>
                        toast.showMessage('Nomor rekening berhasil disalin')
                      }
                    >
                      <Typography style={{ cursor: 'pointer' }} color="primary">
                        Salin
                      </Typography>
                    </CopyToClipboard>
                  </Box>
                </Box>
                <Typography variant="body2">Sejumlah:</Typography>
                <Box className={classes.infoBox}>
                  <Typography
                    variant="body1"
                    align="center"
                    color="primary"
                    style={{
                      fontSize: 24,
                      fontWeight: 600,
                    }}
                  >
                    Rp {formatCurrency.format(donation.total)}
                  </Typography>
                  <CopyToClipboard
                    text={donation.total}
                    onCopy={() =>
                      toast.showMessage('Nominal donasi berhasil disalin')
                    }
                  >
                    <Typography style={{ cursor: 'pointer' }} color="primary">
                      Salin
                    </Typography>
                  </CopyToClipboard>
                </Box>
                <Typography variant="body2" gutterBottom>
                  Mohon transfer tepat sampai <b>3 angka terakhir</b> agar
                  donasi terverifikasi secara otomatis.
                </Typography>
              </div>
            ) : (
              <Box className={classes.accounNumber}>
                <Typography variant="body2" align="center" gutterBottom>
                  Silahkan klik link berikut untuk menyelesaikan pembayaran:
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
              </Box>
            )
          ) : donation.status === 'paid' ? (
            <Box className={classes.accounNumber}>
              <Typography align="center">
                Donasi telah dibayar menggunakan{' '}
                {donation?.donation_payment?.payment_method?.name} pada{' '}
                {moment(donation.payment_confirmed_time).format('LL')}
                {' pukul '}
                {moment(donation.payment_confirmed_time).format('LT')}
              </Typography>
            </Box>
          ) : donation.status === 'expired' ? (
            <Box className={classes.accounNumber}>
              <Typography>Donasi telah expired</Typography>
            </Box>
          ) : donation.status === 'cancelled' ? (
            <Box className={classes.accounNumber}>
              <Typography>Donasi telah dibatalkan</Typography>
            </Box>
          ) : (
            <Box className={classes.accounNumber}>
              <Typography>Donasi telah dibatalkan</Typography>
            </Box>
          )}
          {donation.status === 'pending' && (
            <Box className={classes.paymentLimit}>
              <Typography
                variant="body2"
                align="center"
                style={{ fontSize: 12 }}
              >
                Bayar sebelum{' '}
                <span style={{ fontWeight: 600 }}>
                  {/* {new Date(donation.expiration).toLocaleString()} */}
                  {moment(donation.expiration).format('LL')}{' '}
                  {moment(donation.expiration).format('LT')} {' WIB'}
                </span>{' '}
                atau donasi kamu otomatis dibatalkan.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {donation.status !== 'pending' && (
        <Box className={classes.totalDonation}>
          <Typography variant="body2" align="center" gutterBottom>
            Donasi yang diberikan
          </Typography>
          {donation.status === 'expired' || donation.status === 'cancelled' ? (
            <>
              <Typography
                variant="body1"
                align="center"
                color="primary"
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  textDecoration: 'line-through',
                }}
                gutterBottom
              >
                Rp {formatCurrency.format(donation.donation_amount)}
              </Typography>
              <Typography variant="body2" align="center">
                Infaq
              </Typography>
              <Typography
                variant="body1"
                align="center"
                color="primary"
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  textDecoration: 'line-through',
                }}
                gutterBottom
              >
                Rp {formatCurrency.format(donation.infaq_amount)}
              </Typography>
              <Typography variant="body2" align="center">
                Total yang dibayar
              </Typography>
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
                Rp {formatCurrency.format(donation.total)}
              </Typography>
            </>
          ) : (
            <>
              <Typography
                variant="body1"
                align="center"
                color="primary"
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                }}
                gutterBottom
              >
                Rp {formatCurrency.format(donation.donation_amount)}
              </Typography>
              <Typography variant="body2" align="center">
                Infaq
              </Typography>
              <Typography
                variant="body1"
                align="center"
                color="primary"
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                }}
                gutterBottom
              >
                Rp {formatCurrency.format(donation.infaq_amount)}
              </Typography>
              <Typography variant="body2" align="center">
                Total yang dibayar
              </Typography>
              <Typography
                variant="body1"
                align="center"
                color="primary"
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                }}
              >
                Rp {formatCurrency.format(donation.total)}
              </Typography>
            </>
          )}
        </Box>
      )}

      <Box p={2} display="flex" justifyContent="space-between">
        <Typography variant="body1" style={{ fontSize: 12 }}>
          Invoice: {donation.invoice_number}
        </Typography>
        <Typography variant="body1" style={{ fontSize: 12 }}>
          {/* {new Date(donation.created_at).toLocaleString()} */}
          {moment(donation.created_at).format('LL')}{' '}
          {moment(donation.created_at).format('LT')} {' WIB'}
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

      <PayWithZipayWallet
        open={openPayWithZipayWallet}
        onClose={() => setOpenPayWithZipayWallet(false)}
      />
    </Box>
  );
};

DonationSummaryScreen.propTypes = {
  donation: PropTypes.object,
};

export default DonationSummaryScreen;
