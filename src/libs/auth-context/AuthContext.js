/* eslint-disable no-unused-vars */
import React from 'react';

export default React.createContext({
  token: null,
  dataLogin: null,
  isLoggedIn: false,
  login: (dataLogin) => {},
  logout: () => {},
  updateDataLogin: (newDataLogin) => {},
});
