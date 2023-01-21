import { useSelector } from 'react-redux';

const useSessionErrors = () => {
  const errors = useSelector((state) => state.errors.session);

  return {
    errors,
  }
};

export default useSessionErrors;