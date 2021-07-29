/* eslint-disable no-undef */
import axios from 'axios';
import qs from 'querystring';
import Router from 'next/router';

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/v1`,
});

axiosInstance.interceptors.request.use(
  function (config) {
    let token = localStorage.getItem('token');

    config.headers = {
      Authorization: `Bearer ${token}`,
      ...config.headers,
    };

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = { ...error.config };

    if (
      error.response &&
      error.response.status === 400 &&
      originalRequest.url === `/oauth/login`
    ) {
      await localStorage.removeItem('token');
      await localStorage.removeItem('data_login');
      Router.push('/login');
      return Promise.reject(error);
    }

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = JSON.parse(localStorage.getItem('data_login'))
        .refresh_token;

      const bodyRequest = qs.stringify({
        grant_type: 'refresh_token',
        client_id: '1bzb3z830jo4077fp',
        client_secret: 'uBS0Gh4p1cyuwApMpg4yIiKfFhq77KhP',
        refresh_token: refreshToken,
      });
      const { data } = await axiosInstance({
        url: '/oauth/login',
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: bodyRequest,
      });

      await localStorage.setItem('token', data.access_token);
      await localStorage.setItem('data_login', JSON.stringify(data));
      originalRequest.headers['Authorization'] = 'Bearer ' + data.access_token;
      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);
