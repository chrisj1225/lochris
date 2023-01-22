import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../actions/session_actions';

const useSessions = () => {
  const dispatch = useDispatch();

  const {
    isAuthenticated,
    user,
    isLoggedIn,
  } = useSelector((state) => state.session);

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
  }
};

export default useSessions;