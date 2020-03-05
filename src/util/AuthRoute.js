import React from 'react';
import { Route, Redirect } from 'react-router-dom';
//Redux Imports
import { useSelector } from 'react-redux';

const AuthRoute = ({ component: Component, ...rest }) => {
  const authenticated = useSelector(state => state.user.authenticated);
  return (
    <Route
      {...rest}
      render={props =>
        (authenticated === false || authenticated === undefined) &&
        (rest.path === '/home' || rest.path === '/compose/list') ? (
          <Redirect to="/login" />
        ) : authenticated === true &&
          (rest.path === '/' || rest.path === '/login' || rest.path === '/signup') ? (
          <Redirect to="/home" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default AuthRoute;
