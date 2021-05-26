export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

export const pageview = (pixelId = FB_PIXEL_ID) => {
  window.fbq('trackSingle', `${pixelId}`, 'PageView');
  // window.fbq('track', 'PageView');
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name, pixelId = FB_PIXEL_ID, options = {}) => {
  window.fbq('trackSingle', `${pixelId}`, name, options);
};

export const eventCustom = (name, pixelId = FB_PIXEL_ID, options = {}) => {
  window.fbq('trackSingleCustom', `${pixelId}`, name, options);
};

export const init = (pixelId) => {
  window.fbq('init', pixelId);
};
