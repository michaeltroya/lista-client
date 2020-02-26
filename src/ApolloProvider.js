import React from 'react';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
//jwt
import jwtDecode from 'jwt-decode';
//util
import { getUserFromToken } from './util/decode';
import App from './App';

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/'
});

const token = localStorage.getItem('token');

cache.writeData({
  data: {
    userData: {
      __typename: 'UserData',
      authenticated: false
    }
  }
});

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
  } else {
    cache.writeData({
      data: {
        userData: getUserFromToken(token)
      }
    });
  }
}

const authLink = setContext((_, { headers }) => {
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

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
