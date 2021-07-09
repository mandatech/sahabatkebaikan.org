import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/ChevronLeft';
import Header from 'components/Header';
import Layout from 'components/Layout';
import SahabatBaikInfoScreen from 'modules/sahabat-baik/info/screen';
import CampaignList from 'modules/sahabat-baik/campaign-list/screen';
import DataNotFound from 'components/DataNotFound';
// import { validateToken } from 'services/auth.service';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
  },
  headerRoot: {
    borderBottom: 'solid 1px lightgrey',
  },
}));

const ProfilePage = ({ user }) => {
  const classes = useStyles();
  const [profile, setProfile] = useState();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    if (user?.role === 'campaigner') {
      setProfile(user);
    }
  }, []);

  return (
    <>
      <Layout
        menu={2}
        withBottomNav
        header={
          <Header
            title="Profil Penggalang Dana"
            icon={<BackIcon />}
            backButton={true}
            TitleProps={{ align: 'left' }}
            // color="inherit"
            elevation={0}
            classes={{
              root: classes.headerRoot,
            }}
          />
        }
      >
        {!profile ? (
          <Box className={classes.root}>
            <DataNotFound />
          </Box>
        ) : (
          <>
            <SahabatBaikInfoScreen profile={profile} />
            <CampaignList profile={profile} />
          </>
        )}
      </Layout>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/users/${params.id_or_username}`
  );
  const user = await res.json();

  return {
    props: {
      user,
    },
  };
}

ProfilePage.propTypes = {
  user: PropTypes.object,
};

export default ProfilePage;
