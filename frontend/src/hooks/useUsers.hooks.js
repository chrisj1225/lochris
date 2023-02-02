import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchAllUsers
} from '../actions/user_actions';

const useUsers = (userId) => {
  const dispatch = useDispatch();

  const {
    allUsers
  } = useSelector((state) => state.users);

  const getAllUsers = (callback) => {
    dispatch(fetchAllUsers(callback));
  };
  
  React.useEffect(() => {
    getAllUsers();
  }, []);

  return {
    allUsers,
    getAllUsers,
  }
}

export default useUsers;