import { makeStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/ChevronLeft';
import Header from 'components/Header';
import Layout from 'components/Layout';
import DonationAmountScreen from 'modules/donation-process/choose-donation-amount';

const useStyles = makeStyles(() => ({
  headerRoot: {
    borderBottom: 'solid 1px lightgrey',
    // borderBottomColor: theme.palette.background.default,
    // boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.25)',
  },
}));

const DonationAmount = () => {
  const classes = useStyles();

  return (
    <Layout>
      <Header
        title="Tentukan Nominal Donasi"
        color="inherit"
        elevation={0}
        TitleProps={{ variant: 'body1', align: 'center' }}
        classes={{
          root: classes.headerRoot,
        }}
        icon={<BackIcon />}
        backButton={true}
      />
      <DonationAmountScreen />
    </Layout>
  );
};

export default DonationAmount;
