// import { axiosInstance } from 'config/axios';
import { axiosInstance } from 'config/axios';

export const getPaymentMethodWithBankDetail = async (paymentMethodId) => {
  const { data } = await axiosInstance({
    url: `/payment-methods/${paymentMethodId}/bank-detail`,
    method: 'GET',
  });

  return data;
};
