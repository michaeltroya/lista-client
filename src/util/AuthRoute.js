import React from 'react';
import { Route, Redirect } from 'react-router-dom';
//gql
import { useQuery } from '@apollo/react-hooks';
import { GET_AUTHENTICATED } from '../graphql/clientQueries';

const AuthRoute = ({ component: Component, ...rest }) => {
  const {
    data: {
      userData: { authenticated }
    }
  } = useQuery(GET_AUTHENTICATED);

  return (
    <Route
      {...rest}
      render={props =>
        (authenticated === false || authenticated === undefined) && rest.path === '/home' ? (
          <Redirect to="/login" />
        ) : authenticated === true && rest.path === '/' ? (
          <Redirect to="/home" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default AuthRoute;
