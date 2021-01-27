import { axiosInstance } from 'config/axios';
import useGetOne from 'libs/hooks/useGetOne';

export const createDonation = async (
  campaign_id,
  donation_amount,
  infaq_amount,
  is_anonymous,
  note,
  payment_method_id
) => {
  const { data } = await axiosInstance({
    url: '/donations',
    method: 'POST',
    data: {
      campaign_id,
      donation_amount,
      infaq_amount,
      is_anonymous,
      note,
      payment_method_id,
    },
  });

  return data;
};

export function getDonationDetail(id) {
  const { data, isFetching, error } = useGetOne(`/donations/${id}`);

  return { data, isFetching, error };
}
