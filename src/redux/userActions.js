import { LOGIN_USER, LOGOUT_USER, SET_USER_DETAILS } from './types';
import { useApolloClient } from '@apollo/react-hooks';
import { FETCH_USER_QUERY } from '../graphql/server';
import ApolloClient from 'apollo-client';

export const login = ({ token, __typename, ...userData }, history) => dispatch => {
  localStorage.setItem('token', token);
  history.push('/home');
  dispatch({ type: SET_USER_DETAILS, payload: userData });
};

export const logout = () => {};
