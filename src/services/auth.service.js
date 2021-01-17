import qs from 'querystring';
import { axiosInstance } from 'config/axios';
import firebase, { FacebookProvider, GoogleProvider } from 'config/firebase';

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

export const requestPasswordResetToken = async (email) => {
  const { data } = await axiosInstance({
    url: `/auth/request-password-reset-token`,
    method: 'POST',
    data: {
      email,
    },
  });

  return data;
};

export const validatePasswordResetToken = async (token) => {
  const { data } = await axiosInstance({
    url: `/auth/validate-password-reset-token`,
    method: 'POST',
    data: {
      token,
    },
  });

  return data;
};

export const resetPassword = async (email, new_password, token) => {
  const { data } = await axiosInstance({
    url: `/auth/reset-password`,
    method: 'POST',
    data: {
      email,
      new_password,
      token,
    },
  });

  return data;
};

export const loginWithFirebaseToken = async (token) => {
  const { data } = await axiosInstance({
    url: `/auth/login-user-with-firebase`,
    method: 'POST',
    data: {
      token,
    },
  });

  return data;
};

export const getFirebaseTokenWithGoogle = async () => {
  const result = await firebase.auth().signInWithPopup(GoogleProvider);

  const user = result.user;

  const token = await user.getIdToken(true);

  return token;
};

export const getFirebaseTokenWithFacebook = async () => {
  const result = await firebase.auth().signInWithPopup(FacebookProvider);

  const user = result.user;

  const token = await user.getIdToken(true);

  return token;
};
