import { useEffect } from 'react';
import Layout from 'components/Layout';
import RegisterScreen from 'modules/auth/register/screen';

const Register = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <Layout>
      <RegisterScreen />
    </Layout>
  );
};

export default Register;
