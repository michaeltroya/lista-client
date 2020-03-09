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

//CREATE AND DELETE LISTS

export const CREATE_LIST = gql`
  mutation createList($title: TitleInput!, $tags: [String]!, $items: [ItemsInput]!) {
    createList(title: $title, tags: $tags, items: $items) {
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
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
      likes {
        username
      }
      likeCount
      createdAt
    }
  }
`;

export const DELETE_LIST = gql`
  mutation DeleteList($listId: ID!) {
    deleteList(listId: $listId)
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

//COMMENT AND DELETE COMMENT

export const CREATE_COMMENT = gql`
  mutation createComment($listId: ID!, $body: String!) {
    createComment(listId: $listId, body: $body) {
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
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
      likes {
        username
      }
      likeCount
      createdAt
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($listId: ID!, $commentId: ID!) {
    deleteComment(listId: $listId, commentId: $commentId) {
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
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
      likes {
        username
      }
      likeCount
      createdAt
    }
  }
`;
