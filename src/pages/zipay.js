import { makeStyles } from '@material-ui/core/styles';
import Layout from 'components/Layout';
import Header from 'components/Header';
import ZipayHomeScreen from 'modules/zipay/home';
import BackIcon from '@material-ui/icons/ChevronLeft';

const useStyles = makeStyles(() => ({
  headerRoot: {
    borderBottom: 'solid 1px lightgrey',
  },
}));

const ContactPage = () => {
  const classes = useStyles();

  return (
    <Layout>
      <Header
        title="Zipay Wallet"
        icon={<BackIcon />}
        backButton={true}
        TitleProps={{ align: 'left' }}
        color="inherit"
        elevation={0}
        classes={{
          root: classes.headerRoot,
        }}
      />
      <ZipayHomeScreen />
    </Layout>
  );
};

export default ContactPage;
