import { LOGIN_USER, LOGOUT_USER, SET_USER_DETAILS } from './types';

const initialState = {
  authenticated: false,
  userData: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        authenticated: true,
        ...action.payload
      };
    case SET_USER_DETAILS:
      return {
        authenticated: true,
        userData: { ...action.payload }
      };
    case LOGOUT_USER:
      return {
        ...state
      };

    default:
      return state;
  }
}
