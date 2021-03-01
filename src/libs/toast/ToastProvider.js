import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ToastContext from './ToastContext';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// export const ToastContext = React.createContext({ showMessage: () => {} });

const ToastProvider = ({ children, autoHideDuration = 3000 }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState();
  const [severity, setSeverity] = useState('info');
  const [toastContextValue] = useState({
    showMessage: (message, severity) => {
      setSeverity(severity);
      setMessage(message);
      setOpenAlert(true);
    },
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <ToastContext.Provider value={toastContextValue}>
      {children}
      <Snackbar
        open={openAlert}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
        style={{
          zIndex: 999999999999999,
        }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          style={{
            zIndex: 999999999999999,
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node,
  autoHideDuration: PropTypes.number,
};

export default ToastProvider;
