import { makeStyles } from '@material-ui/core/styles';
import Layout from 'components/Layout';
import Header from 'components/Header';
import AboutScreen from 'modules/about/screen';

const useStyles = makeStyles(() => ({
  headerRoot: {
    borderBottom: 'solid 1px lightgrey',
  },
}));

const AboutPage = () => {
  const classes = useStyles();

  return (
    <Layout
      header={
        <Header
          title="Tentang Sahabatkebaikan"
          // icon={<BackIcon />}
          // backButton={true}
          // TitleProps={{ align: 'left' }}
          // color="inherit"
          elevation={0}
          classes={{
            root: classes.headerRoot,
          }}
        />
      }
    >
      <AboutScreen />
    </Layout>
  );
};

export default AboutPage;
