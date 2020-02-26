import jwtDecode from 'jwt-decode';

export const getUserFromToken = token => {
  if (token) {
    const { id, email, username } = jwtDecode(token);
    return {
      __typename: 'UserData',
      id,
      email,
      username
    };
  }
};
