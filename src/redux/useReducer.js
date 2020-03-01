import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USER_DETAILS, SET_FOLLOWERS } from './types';

const initialState = {
  authenticated: false,
  credentials: {},
  following: [],
  followers: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state
      };
    case SET_USER_DETAILS:
      return {
        ...state,
        credentials: {
          id: action.payload.id,
          email: action.payload.email,
          username: action.payload.username,
          createdAt: action.payload.createdAt
        },
        following: [...action.payload.following],
        followers: [...action.payload.followers]
      };
    case SET_FOLLOWERS:
      return {
        ...state,
        following: [...action.payload]
      };

    default:
      return state;
  }
}
