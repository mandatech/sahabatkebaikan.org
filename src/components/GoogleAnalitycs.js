import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as gtag from 'libs/gtag';

const GoogleAnalitycs = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return children;
};

export default GoogleAnalitycs;
