import React from 'react';

import { useSessions } from '../hooks';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({ component: Component, path, exact }) => {
  const { isAuthenticated } = useSessions();

  return (
    <Route path={path} exact={exact} render={(props) => (
      !isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    )} />
  );
}

const Protected = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSessions();

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export const AuthRoute = withRouter(Auth);
export const ProtectedRoute = withRouter(Protected);