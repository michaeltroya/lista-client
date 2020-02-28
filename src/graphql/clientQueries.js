import gql from 'graphql-tag';

//GET USER DATA
export const GET_USER_DATA = gql`
  query {
    userDetails @client {
      id
      username
      email
      followers
      following
    }
  }
`;

//GET AUTH
export const GET_AUTHENTICATED = gql`
  query {
    authenticated @client
  }
`;
