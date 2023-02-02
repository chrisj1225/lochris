import { useDispatch, useSelector } from 'react-redux';
import { signup, login, logout } from '../actions/session_actions';

const useSessions = () => {
  const dispatch = useDispatch();

  const {
    isAuthenticated,
    user,
    isLoggedIn,
  } = useSelector((state) => state.session);

  const signupGuest = (user, callback) => {
    dispatch(signup(user, callback));
  }

  const loginUser = (user) => {
    dispatch(login(user));
  }

  const logoutUser = () => {
    dispatch(logout());
  }

  return {
    isAuthenticated,
    user,
    isLoggedIn,
    loginUser,
    logoutUser,
    signupGuest,
  }
};

export default useSessions;