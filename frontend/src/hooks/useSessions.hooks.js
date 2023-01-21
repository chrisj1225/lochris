import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/session_actions';

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

  return {
    isAuthenticated,
    user,
    isLoggedIn,
    loginUser,
  }
};

export default useSessions;