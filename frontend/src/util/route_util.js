import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({ component: Component, path, exact }) => {
  const { isAuthenticated } = useSelector((state) => state.sessionState);

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
  const { isAuthenticated } = useSelector((state) => state.sessionState);

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