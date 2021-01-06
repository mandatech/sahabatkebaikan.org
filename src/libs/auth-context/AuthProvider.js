import { useState, useEffect } from 'react';
// import Router from 'next/router';
import PropTypes from 'prop-types';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [dataLogin, setDataLogin] = useState(null);

  const handleLogin = (dataLogin) => {
    setToken(dataLogin.access_token);
    setDataLogin(dataLogin);
    setIsLoggedIn(true);

    localStorage.setItem('token', dataLogin.access_token);
    localStorage.setItem('data_login', JSON.stringify(dataLogin));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('data_login');
    setIsLoggedIn(false);
    setToken(null);
    setDataLogin(null);
    // Router.push('/');
  };

  const updateDataLogin = (dataLogin) => {
    setToken(dataLogin.access_token);
    setDataLogin(dataLogin);

    localStorage.setItem('token', dataLogin.access_token);
    localStorage.setItem('data_login', JSON.stringify(dataLogin));
  };

  useEffect(() => {
    const data_login = JSON.parse(localStorage.getItem('data_login'));

    if (data_login) {
      handleLogin(data_login);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        dataLogin,
        isLoggedIn,
        login: handleLogin,
        logout: handleLogout,
        updateDataLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
