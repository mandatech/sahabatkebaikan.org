import Layout from 'components/Layout';
import Header from 'components/Header';
import AboutScreen from 'modules/about/screen';

const AboutPage = () => {
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
        />
      }
    >
      <AboutScreen />
    </Layout>
  );
};

export default AboutPage;
