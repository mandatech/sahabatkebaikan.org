import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/ChevronLeft';
import Header from 'components/Header';
import Layout from 'components/Layout';
import ZakatCampaignList from 'modules/category/zakat/zakat-campaign-list';
import ZakatMenu from 'modules/category/zakat/zakat-menu';
import { axiosInstance } from 'config/axios';

const useStyles = makeStyles(() => ({
  headerRoot: {
    borderBottom: 'solid 1px lightgrey',
  },
}));

const ZakatPage = ({ category }) => {
  const classes = useStyles();

  return (
    <Layout>
      <Header
        title="Zakat"
        icon={<BackIcon />}
        backButton={true}
        TitleProps={{ align: 'left' }}
        color="inherit"
        elevation={0}
        classes={{
          root: classes.headerRoot,
        }}
      />
      <ZakatMenu />
      <ZakatCampaignList category={category} />
    </Layout>
  );
};

export async function getServerSideProps() {
  const { data: category } = await axiosInstance({
    url: `/categories/zakat`,
    method: 'GET',
  });

  return {
    props: {
      category,
    },
  };
}

ZakatPage.propTypes = {
  category: PropTypes.object,
};

export default ZakatPage;
