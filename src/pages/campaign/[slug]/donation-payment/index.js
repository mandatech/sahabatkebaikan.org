import { makeStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/ChevronLeft';
import Header from 'components/Header';
import Layout from 'components/Layout';
import DonationPaymentScreen from 'modules/donation-process/choose-payment-method';

const useStyles = makeStyles(() => ({
  headerRoot: {
    borderBottom: 'solid 1px lightgrey',
  },
}));

const DonationPayment = () => {
  const classes = useStyles();

  return (
    <Layout>
      <Header
        title="Metode Pembayaran Donasi"
        color="inherit"
        elevation={0}
        TitleProps={{ variant: 'body1', align: 'center' }}
        classes={{
          root: classes.headerRoot,
        }}
        icon={<BackIcon />}
        backButton={true}
      />
      <DonationPaymentScreen />
    </Layout>
  );
};

export default DonationPayment;
