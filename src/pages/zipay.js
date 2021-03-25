import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Layout from 'components/Layout';
import Header from 'components/Header';
import ZipayHomeScreen from 'modules/zipay/home';
import BackIcon from '@material-ui/icons/ChevronLeft';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    background: theme.palette.background.paper,
  },
  headerRoot: {
    borderBottom: 'solid 1px lightgrey',
  },
}));

const ZipayPage = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  const getProfileData = async () => {
    setIsLoading(true);
    if (localStorage.getItem('token') && localStorage.getItem('data_login')) {
      const dataLogin = JSON.parse(localStorage.getItem('data_login'));

      setProfile(dataLogin.user);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    getProfileData();
  }, []);

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

      {isLoading ? (
        <Box className={classes.root} />
      ) : (
        <ZipayHomeScreen profile={profile} />
      )}
    </Layout>
  );
};

export default ZipayPage;
