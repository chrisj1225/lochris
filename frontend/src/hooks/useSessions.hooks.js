import { useSelector } from 'react-redux';

export default () => {
  const {
    isAuthenticated
  } = useSelector((state) => state.sessionState);

  return {
    isAuthenticated,
  }
};
