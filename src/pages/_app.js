import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
// import { useRouter } from 'next/router';

import theme from '../components/theme';
// import { validateToken } from 'services/auth.service';
import { ToastProvider } from 'libs/toast';
export default function MyApp(props) {
  const { Component, pageProps } = props;
  // const router = useRouter();

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

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    // if (localStorage.getItem('token')) {
    // handleValidateToken();
    // }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Sahabat Kebaikan | sahabatkebaikan.org</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />

        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
