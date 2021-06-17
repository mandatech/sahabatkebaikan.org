import { useEffect } from 'react';
import { useRouter } from 'next/router';
import querystring from 'querystring';
import Cookies from 'js-cookie';

const AffiliateComponent = ({ children }) => {
  const router = useRouter();
  const { ref } = querystring.parse(router.asPath.split('?')[1]);

  const createHit = async (url) => {
    const affiliateId = Cookies.get('affiliateId');
    const { ref, ...queryParams } = querystring.parse(url.split('?')[1]);

    if (!ref && affiliateId) {
      const params = querystring.stringify({
        ...queryParams,
        ref: affiliateId,
      });

      const urlWithoutParams = url.split('?')[0];

      router.replace(`${urlWithoutParams}?${params}`);
    }
  };
  useEffect(() => {
    if (ref) {
      const affiliateId = Cookies.get('affiliateId');

      // if ref different with affiliateId on the cookie, then change the value of affiliateId
      if (affiliateId !== ref) {
        Cookies.set('affiliateId', ref, {
          expires: 2 / 24, // 2 hours
        });
      }
    } else {
      // add ref={affiliateId} to url
      const affiliateId = Cookies.get('affiliateId');

      if (affiliateId) {
        const queryParams = querystring.parse(router.asPath.split('?')[1]);

        const params = querystring.stringify({
          ...queryParams,
          ref: affiliateId,
        });

        const urlWithoutParams = router.asPath.split('?')[0];
        router.replace(`${urlWithoutParams}?${params}`);
      }
    }

    router.events.on('routeChangeComplete', createHit);
    return () => {
      router.events.off('routeChangeComplete', createHit);
    };
  }, [router.events, ref]);

  return children;
};

export default AffiliateComponent;
