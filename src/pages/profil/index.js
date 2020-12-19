import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from 'components/Header';
import Layout from 'components/Layout';
import ProfileInfo from 'modules/profile/info/screen';
import MenuItem from 'modules/profile/menu-item/screen';

const ProfilePage = () => {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (localStorage.getItem('token') && localStorage.getItem('data_login')) {
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
