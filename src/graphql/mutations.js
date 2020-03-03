import gql from 'graphql-tag';

//LOGIN USER

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      token
      username
      following
      followers
      createdAt
    }
  }
`;

//SIGNUP USER
export const SIGNUP_USER = gql`
  mutation signup($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    signup(
      signupInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      token
      username
      following
      followers
      createdAt
    }
  }
`;

//FOLLOW USER

export const FOLLOW_USER = gql`
  mutation Follow($username: String!) {
    followUser(userToFollow: $username) {
      following
    }
  }
`;

// LIKE AND UNLIKE MUTATION

export const LIKE_UNLIKE = gql`
  mutation like($listId: ID!) {
    likeList(listId: $listId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;
