import jwtDecode from 'jwt-decode';

export const getUserFromToken = token => {
  if (token) {
    const { username } = jwtDecode(token);
    return username;
  }
};
