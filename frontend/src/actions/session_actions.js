import * as sessionsApi from '../util/sessionsApi';
import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_USER_LOGIN = "RECEIVE_USER_LOGIN";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});

export const receiveUserLogIn = () => ({
  type: RECEIVE_USER_LOGIN,
})

export const receiveUserLogout = () => ({
  type: RECEIVE_USER_LOGOUT,
});

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

export const signup = (user, callback) => dispatch => (
  sessionsApi.signup(user)
    .then(res => {
      console.log('user successfully registered!');

      if (callback) {
        callback();
      }
    }, err => (
      dispatch(receiveErrors(err.response.data))
    ))
);

export const login = user => dispatch => (
  sessionsApi.login(user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      sessionsApi.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(receiveCurrentUser(decoded));
    })
    .catch(err => {
      dispatch(receiveErrors(err.response.data));
    })
)

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken');
  sessionsApi.setAuthToken(false);
  dispatch(receiveUserLogout());
}