import { axiosInstance } from 'config/axios';
// import useGetOne from 'libs/hooks/useGetOne';

export const activateZipayAccount = async (phone, pin) => {
  const { data } = await axiosInstance({
    url: '/zipay/activate',
    method: 'POST',
    data: {
      phone,
      pin,
    },
  });

  return data;
};

export const resendOtp = async (phone) => {
  const { data } = await axiosInstance({
    url: '/zipay/resend-otp',
    method: 'POST',
    data: {
      phone,
    },
  });

  return data;
};

export const verifyOtp = async (otp_code) => {
  const { data } = await axiosInstance({
    url: '/zipay/verify-otp',
    method: 'POST',
    data: {
      otp_code,
    },
  });

  return data;
};

export const checkBalance = async () => {
  const { data } = await axiosInstance({
    url: '/zipay/check-balance',
    method: 'POST',
  });

  return data;
};
