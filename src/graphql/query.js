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

//GET ALL LISTS
export const FETCH_ALL_LISTS_QUERY = gql`
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

//GET USER DETAILS FOR REDUX
export const FETCH_USER_DETAILS_QUERY = gql`
  {
    getUserDetails {
      id
      email
      username
      followers
      following
      createdAt
    }
  }
`;

//GET LISTS BY TAG
export const FETCH_TIMELINE_QUERY = gql`
  query Timeline($following: [String]!) {
    getTimeline(following: $following) {
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
