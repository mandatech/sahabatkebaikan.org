/* eslint-disable no-undef */
import { axiosInstance } from 'config/axios';
import moment from 'moment-timezone';

export const createAffiliateHit = async (
  affiliateId,
  url,
  datetime = new Date()
) => {
  const bodyRequest = {
    affiliate_id: affiliateId,
    url,
    datetime: moment(datetime).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
  };
  try {
    const { data } = await axiosInstance({
      url: '/affiliate/hits',
      method: 'POST',
      data: bodyRequest,
    });

    return Promise.resolve(data);
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      return Promise.reject(error.response);
    } else if (error.request) {
      return Promise.reject('Network Error', 'error');
    } else {
      return Promise.reject(error.message, 'error');
    }
  }
};
