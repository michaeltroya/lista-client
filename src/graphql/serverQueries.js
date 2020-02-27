import gql from 'graphql-tag';

// GET SINGLE LIST
export const FETCH_LIST_QUERY = gql`
  query List($listId: ID!) {
    getList(listId: $listId) {
      id
      username
      title {
        phrase
        count
        description
      }
      tags
      items {
        name
        description
        order
      }
      commentCount
      likeCount
      createdAt
    }
  }
`;

//GET ALL LISTS
export const FETCH_LISTS_QUERY = gql`
  {
    getLists {
      id
      username
      title {
        phrase
        count
        description
      }
      tags
      items {
        name
        description
        order
      }
      commentCount
      likeCount
      createdAt
    }
  }
`;

//LOGIN USER

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
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
      username
      token
      createdAt
    }
  }
`;

//GET LISTS BY USERNAME

export const FETCH_USER_LISTS_QUERY = gql`
  query UserLists($username: String!) {
    getUserLists(username: $username) {
      id
      username
      title {
        phrase
        count
        description
      }
      tags
      items {
        name
        description
        order
      }
      commentCount
      likeCount
      createdAt
    }
  }
`;

//GET LISTS BY TAG
export const FETCH_TAG_LISTS_QUERY = gql`
  query TagLists($tag: String!) {
    getTagLists(tag: $tag) {
      id
      username
      title {
        phrase
        count
        description
      }
      tags
      items {
        name
        description
        order
      }
      commentCount
      likeCount
      createdAt
    }
  }
`;
