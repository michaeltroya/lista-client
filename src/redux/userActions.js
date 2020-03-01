import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USER_DETAILS } from './types';

export const login = ({ token, __typename, ...userData }, history) => dispatch => {
  localStorage.setItem('token', token);
  history.push('/home');
  dispatch({ type: SET_AUTHENTICATED });
  dispatch({ type: SET_USER_DETAILS, payload: userData });
};

export const logout = history => dispatch => {
  localStorage.removeItem('token');
  dispatch({ type: SET_UNAUTHENTICATED });
  window.location.href = '/';
};

export const getUserData = data => dispatch => {
  dispatch({ type: SET_USER_DETAILS, payload: data });
};
