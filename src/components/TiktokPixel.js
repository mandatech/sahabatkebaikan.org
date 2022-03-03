import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as ttq from 'libs/tiktokpixel';

const handleRouteChange = () => {
  ttq.viewContent();
};

const TiktokPixel = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    ttq.viewContent();
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return children;
};

export default TiktokPixel;
