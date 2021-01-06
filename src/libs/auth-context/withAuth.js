import React from 'react';
import AuthContext from './AuthContext';
import getDisplayName from 'utils/getDisplayName';

const withAuth = (Component) => {
  const WrappedComponent = React.forwardRef((props, ref) => (
    <AuthContext.Consumer>
      {(context) => (
        <Component
          {...props}
          ref={ref}
          dataLogin={context.dataLogin}
          isLoggedIn={context.isLoggedIn}
          login={context.login}
          logout={context.logout}
        />
      )}
    </AuthContext.Consumer>
  ));

  if (process.env.NODE_ENV !== 'production') {
    WrappedComponent.displayName = `WithAuth(${getDisplayName(Component)})`;
  }

  return WrappedComponent;
};

export default withAuth;
