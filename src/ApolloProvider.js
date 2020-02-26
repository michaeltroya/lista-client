import React from 'react';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
//jwt
import jwtDecode from 'jwt-decode';

import App from './App';

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/'
});

let user = { __typename: 'User', id: '', email: '', username: '' };
const token = localStorage.getItem('token');

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
  } else {
    const { id, email, username } = decodedToken;
    user = {
      id,
      email,
      username
    };
    cache.writeData({
      data: {
        user
      }
    });
  }
} else {
  cache.writeData({
    data: {
      user
    }
  });
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
  link: ApolloLink.from([authLink, httpLink])
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
