import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_LOGIN,
  RECEIVE_USER_LOGOUT,
} from '../../actions/session_actions';

const initialState = {
  isAuthenticated: false,
  user: {},
}

const sessionState = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser,
      }
    case RECEIVE_USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
      }
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined,
      }
    default:
      return state;
  }
}

export default sessionState;