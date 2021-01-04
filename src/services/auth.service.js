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

export const registerWithUsernameOrEmailPassword = async (
  full_name,
  username,
  email,
  phone,
  password
) => {
  const form = new FormData();

  form.append('full_name', full_name);
  form.append('username', username);
  form.append('email', email);
  form.append('phone', phone);
  form.append('password', password);
  form.append('role', 'user');

  const { data } = await axiosInstance({
    url: '/users',
    method: 'POST',
    headers: {
      'content-type': 'multipart/form-data',
    },
    data: form,
  });

  return data;
};

export const updateProfile = async (
  id,
  { full_name, phone, profile_photo }
) => {
  const form = new FormData();
  form.append('full_name', full_name);
  form.append('phone', phone);
  form.append('profile_photo', profile_photo);

  const { data } = await axiosInstance({
    url: `/users/${id}`,
    method: 'PUT',
    headers: {
      'content-type': 'multipart/form-data',
    },
    data: form,
  });

  return data;
};

export const validateToken = async () => {
  const { data } = await axiosInstance({
    url: `/auth/validate-token`,
    method: 'POST',
  });

  return data;
};