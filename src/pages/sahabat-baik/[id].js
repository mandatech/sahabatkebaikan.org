import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/ChevronLeft';
import Header from 'components/Header';
import Layout from 'components/Layout';
import SahabatBaikInfoScreen from 'modules/sahabat-baik/info/screen';
import CampaignList from 'modules/sahabat-baik/campaign-list/screen';
import DataNotFound from 'components/DataNotFound';
// import { validateToken } from 'services/auth.service';

const useStyles = makeStyles(() => ({
  headerRoot: {
    borderBottom: 'solid 1px lightgrey',
  },
}));

const ProfilePage = () => {
  const classes = useStyles();
  const [profile] = useState({
    id: 'e3018e5f-0bf7-4c18-b406-c517b77cd306',
    full_name: 'Campaigner 01',
    email: 'campaigner.01@mail.com',
    username: 'campaigner01',
    phone: '085713470999',
    description: 'Akun campaigner 01',
    role: 'campaigner',
    profile_photo:
      'https://api-staging.sahabatkebaikan.org/media/profile_photo_1609472587872.jpg',
    contacts: [
      {
        id: '22ff186c-97fa-440d-8621-f0d109193059',
        user_id: 'e3018e5f-0bf7-4c18-b406-c517b77cd306',
        contact_name: 'mobile',
        contact_value: '08123456789',
      },
    ],
    social_links: [
      {
        id: '1eed69ba-79a4-4412-88d3-207ab0aa78be',
        user_id: 'e3018e5f-0bf7-4c18-b406-c517b77cd306',
        social_media_name: 'linkedin',
        social_media_links: 'https://linked.in/u/user',
      },
      {
        id: '3173f24b-bdfb-4865-850a-b3421e5bafb3',
        user_id: 'e3018e5f-0bf7-4c18-b406-c517b77cd306',
        social_media_name: 'Facebook',
        social_media_links: 'https://facebook.com/user',
      },
      {
        id: '905e777f-0162-415a-993a-f2bf07e96b48',
        user_id: 'e3018e5f-0bf7-4c18-b406-c517b77cd306',
        social_media_name: 'Twitter',
        social_media_links: 'https://twitter.com/user',
      },
    ],
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      <Layout menu={2} withBottomNav>
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
        {!profile ? (
          <DataNotFound />
        ) : (
          <SahabatBaikInfoScreen profile={profile} />
        )}
        <CampaignList profile={profile} />
      </Layout>
    </>
  );
};

export default ProfilePage;
