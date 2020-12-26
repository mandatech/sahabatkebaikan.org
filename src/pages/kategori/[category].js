import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/ChevronLeft';
import Header from 'components/Header';
import Layout from 'components/Layout';
import CategoryCampaignList from 'modules/category/other/category-campaign-list';
// import { axiosInstance } from 'config/axios';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  headerRoot: {
    borderBottom: 'solid 1px lightgrey',
  },
}));

const CategoryPage = ({ category }) => {
  const classes = useStyles();

  return (
    <Layout>
      <Header
        title={category.name}
        icon={<BackIcon />}
        backButton={true}
        TitleProps={{ align: 'left' }}
        color="inherit"
        elevation={0}
        classes={{
          root: classes.headerRoot,
        }}
      />
      <CategoryCampaignList category={category} />
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const { data: category } = await axios({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/v1/categories/${params.category}`,
    method: 'GET',
  });

  return {
    props: {
      category,
    },
  };
}

CategoryPage.propTypes = {
  category: PropTypes.object,
};

export default CategoryPage;
