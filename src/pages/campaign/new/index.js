import { useEffect, useState } from 'react';
import Router from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Layout from 'components/Layout';
import CreateNewCampaign from 'modules/campaign/create/screen';
import Header from 'components/Header';
import BackIcon from '@material-ui/icons/ChevronLeft';
import Loading from 'components/Loading';

const useStyles = makeStyles(() => ({
  headerRoot: {
    borderBottom: 'solid 1px lightgrey',
  },
}));

const CreateCampaign = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setIsLoading(true);
    if (localStorage.getItem('token') && localStorage.getItem('data_login')) {
      // handleValidateToken();
      const dataLogin = JSON.parse(localStorage.getItem('data_login'));

      if (dataLogin.user.role !== 'campaigner') {
        Router.push('/');
      }
    } else {
      Router.push('/');
    }
    setIsLoading(false);
  }, []);

  return (
    <Layout>
      <Header
        title="Buat Campagin Baru"
        icon={<BackIcon />}
        backButton={true}
        TitleProps={{ align: 'left' }}
        color="inherit"
        elevation={0}
        classes={{
          root: classes.headerRoot,
        }}
      />
      <CreateNewCampaign />
      <Loading open={isLoading} />
    </Layout>
  );
};

export default CreateCampaign;
