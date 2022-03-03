import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import NProgress from 'nprogress';
import theme from '../components/theme';
import { ToastProvider } from 'libs/toast';
import FacebookPixel from 'components/FacebookPixel';
import GoogleAnalitycs from 'components/GoogleAnalitycs';
import AffiliateComponent from 'components/AffiliateComponent';
import { DonationProvider } from 'context/donation.context';
import '../styles/editor.css';
import '../styles/nprogress.css';
import TiktokPixel from 'components/TiktokPixel';
export default function MyApp(props) {
  const { Component, pageProps, router } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  React.useEffect(() => {
    const handleStart = (_, { shallow }) => {
      console.log('shallow', shallow);
      if (!shallow) {
        NProgress.start();
      }
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router.events]);

  return (
    <React.Fragment>
      <Head>
        <title>Sahabat Kebaikan | sahabatkebaikan.org</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="facebook-domain-verification"
          content="i4vyknkcxje8q1el4h9lznzhk8q9zp"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <AffiliateComponent>
            <GoogleAnalitycs>
              <FacebookPixel>
                <TiktokPixel>
                  <ToastProvider>
                    <DonationProvider>
                      <Component {...pageProps} />
                    </DonationProvider>
                  </ToastProvider>
                </TiktokPixel>
              </FacebookPixel>
            </GoogleAnalitycs>
          </AffiliateComponent>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};
