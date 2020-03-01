import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USER_DETAILS } from './types';

const initialState = {
  authenticated: false,
  userData: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_USER_DETAILS:
      return {
        ...state,
        userData: { ...action.payload }
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state
      };

    default:
      return state;
  }
}
