import {
  RECEIVE_ALL_USERS,
} from '../../actions/user_actions';

const initialState = {
  allUsers: [],
};

const userState = (state = initialState, action) => {
  switch(action.type) {
    case RECEIVE_ALL_USERS:
      return {
        ...state,
        allUsers: action.users.allUsers,
        userIdMap: action.users.userIdMap,
      }
    default:
      return state;
  }
}

export default userState;