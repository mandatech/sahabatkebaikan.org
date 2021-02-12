import { makeStyles } from '@material-ui/core/styles';
import Layout from 'components/Layout';
import Header from 'components/Header';
import ContactUsScreen from 'modules/contact/screen';
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
        title="Kontak Kami"
        icon={<BackIcon />}
        backButton={true}
        TitleProps={{ align: 'left' }}
        color="inherit"
        elevation={0}
        classes={{
          root: classes.headerRoot,
        }}
      />
      <ContactUsScreen />
    </Layout>
  );
};

export default ContactPage;
