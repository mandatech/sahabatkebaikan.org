import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from 'components/Header';
import Layout from 'components/Layout';
import ProfileInfo from 'modules/profile/info/screen';
import MenuItem from 'modules/profile/menu-item/screen';
import { useAuth } from 'libs/auth-context';
// import { validateToken } from 'services/auth.service';

const ProfilePage = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  // console.log('isLoggedIn', isLoggedIn);

  // const handleValidateToken = async () => {
  //   try {
  //     await validateToken();
  //   } catch (error) {
  //     console.log('error', error);
  //     if (error.response) {
  //       console.log(error.response.data);
  //     } else if (error.request) {
  //       console.log(error.request);
  //     } else {
  //       console.log('Error', error.message);
  //     }
  //     await localStorage.removeItem('token');
  //     await localStorage.removeItem('data_login');

  //     router.push(`/login?redirect=${router.pathname}`);
  //   }
  // };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (!isLoggedIn) {
      router.push('/login?redirect=/profil');
    }
  }, []);

  return (
    <>
      <Layout menu={2} withBottomNav>
        <Header title="Profil Saya" />
        <ProfileInfo />
        <MenuItem />
      </Layout>
    </>
  );
};

export default ProfilePage;
