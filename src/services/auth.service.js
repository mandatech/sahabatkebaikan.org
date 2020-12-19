import qs from 'querystring';
import { axiosInstance } from 'config/axios';

export const loginWithUsernameOrEmailPassword = async (username, password) => {
  const bodyRequest = qs.stringify({
    grant_type: 'password',
    client_id: '1bzb3z830jo4077fp',
    client_secret: 'uBS0Gh4p1cyuwApMpg4yIiKfFhq77KhP',
    username,
    password,
  });

  const { data } = await axiosInstance({
    url: '/oauth/login',
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: bodyRequest,
  });

  return data;
};
