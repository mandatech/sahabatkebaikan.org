import { useEffect } from 'react';
import { useRouter } from 'next/router';
import querystring from 'querystring';
import Cookies from 'js-cookie';
import { createAffiliateHit } from 'services/affilaite.service';

const AffiliateComponent = ({ children }) => {
  const router = useRouter();
  const { ref } = querystring.parse(router.asPath.split('?')[1]);

  const addRefParamToUrl = async (url) => {
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

  const handleCreateHit = async (affiliateId) => {
    const { ref, ...queryParams } = querystring.parse(
      router.asPath.split('?')[1]
    );
    const params = querystring.stringify({
      ...queryParams,
      ref,
    });
    const urlWithoutParams = router.asPath.split('?')[0];

    try {
      await createAffiliateHit(
        affiliateId,
        `${location.origin}${urlWithoutParams}?${params}`,
        new Date()
      );
    } catch (error) {
      // if affilaite id is not valid then remove cookie and ref query from the url
      if (error.status >= 400) {
        Cookies.remove('affiliateId');

        let url = urlWithoutParams;
        const params = querystring.stringify({
          ...queryParams,
        });

        if (Object.keys(queryParams).length >= 1) {
          url += `?${params}`;
        }

        router.replace(url);
      }
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

      handleCreateHit(ref);
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

    router.events.on('routeChangeComplete', addRefParamToUrl);
    return () => {
      router.events.off('routeChangeComplete', addRefParamToUrl);
    };
  }, [router.events, ref]);

  return children;
};

export default AffiliateComponent;
