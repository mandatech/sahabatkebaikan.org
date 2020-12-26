import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from 'components/Header';
import Layout from 'components/Layout';
import ProfileInfo from 'modules/profile/info/screen';
import MenuItem from 'modules/profile/menu-item/screen';
import { validateToken } from 'services/auth.service';

const ProfilePage = () => {
  const router = useRouter();
  const [profile, setProfile] = useState(null);

  const handleValidateToken = async () => {
    try {
      await validateToken();
    } catch (error) {
      console.log('error', error);
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      await localStorage.removeItem('token');
      await localStorage.removeItem('data_login');

      router.push(`/login?redirect=${router.pathname}`);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (localStorage.getItem('token') && localStorage.getItem('data_login')) {
      handleValidateToken();
      const dataLogin = JSON.parse(localStorage.getItem('data_login'));
      setProfile(dataLogin.user);
    } else {
      router.push('/login?redirect=/profil');
    }
  }, []);

  // useEffect(() => {
  //   if (profile) setIsLoading(false);
  // }, [profile]);

  // if (isLoading) return 'Loading';

  return (
    <>
      <Layout menu={2} withBottomNav>
        <Header title="Profil Saya" />
        <ProfileInfo profile={profile} />
        <MenuItem />
      </Layout>
    </>
  );
};

export default ProfilePage;
