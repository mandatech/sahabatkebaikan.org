import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Layout from 'components/Layout';
import LoginScreen from 'modules/auth/login/screen';

const Login = ({ query }) => {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      if (query.redirect) {
        Router.push(window.location.search.slice(10));
      } else {
        Router.push('/');
      }
    } else {
      Router.prefetch('/register');
    }
  }, []);

  return (
    <Layout>
      <LoginScreen />
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  return {
    props: {
      query: ctx.query || '',
    },
  };
}

Login.propTypes = {
  query: PropTypes.object,
};

export default Login;
