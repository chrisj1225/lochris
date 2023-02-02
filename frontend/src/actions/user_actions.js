import * as usersApi from '../util/usersApi';

export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";

export const receiveAllUsers = (users) => ({
  type: RECEIVE_ALL_USERS,
  users,
});

export const fetchAllUsers = (callback) => dispatch => (
  usersApi.getAllUsers()
    .then(res => {
      dispatch(receiveAllUsers(res.data));

      if (callback) {
        callback();
      }
    })
);
