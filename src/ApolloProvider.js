import React from 'react';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import jwtDecode from 'jwt-decode';
//Redux imports
import { Provider } from 'react-redux';
import store from './redux/store';
import { logout } from './redux/userActions';
import { SET_AUTHENTICATED, SET_USER_DETAILS } from './redux/types';
//query
import { FETCH_USER_DETAILS_QUERY } from './graphql/query';

import App from './App';

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: 'https://lista-gql-api.herokuapp.com/'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([authLink, httpLink]),
  resolvers: {}
});

const token = localStorage.getItem('token');

if (token) {
  const decodeToken = jwtDecode(token);
  if (decodeToken.exp * 1000 < Date.now()) {
    store.dispatch(logout());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    client
      .query({ query: FETCH_USER_DETAILS_QUERY })
      .then(res => {
        store.dispatch({ type: SET_USER_DETAILS, payload: res.data.getUserDetails });
      })
      .catch(err => console.log(err));
  }
}

export default (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
);
