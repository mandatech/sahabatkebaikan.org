export const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;

export const viewContent = (pixelId = TIKTOK_PIXEL_ID) => {
  window.ttq.instance(pixelId).track('ViewContent');
};
