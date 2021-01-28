import Header from 'components/Header';
import Layout from 'components/Layout';
import ProfileEditScreen from 'modules/profile/edit/screen';

const ProfileEdit = () => (
  <Layout>
    <Header title="Edit Profil Saya" />
    <ProfileEditScreen />
  </Layout>
);

export default ProfileEdit;
