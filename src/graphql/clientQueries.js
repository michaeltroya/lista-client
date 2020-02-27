import gql from 'graphql-tag';

//CHECK IF CURRENT USER IS AUTHENTICATED
export const GET_AUTHENTICATED = gql`
  query {
    userData @client {
      username
      authenticated
    }
  }
`;
