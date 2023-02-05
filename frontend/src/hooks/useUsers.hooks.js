import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchAllUsers
} from '../actions/user_actions';

const useUsers = (userId) => {
  const dispatch = useDispatch();

  const {
    allUsers,
    userIdMap,
  } = useSelector((state) => state.users);

  const getAllUsers = (callback) => {
    dispatch(fetchAllUsers(callback));
  };
  
  React.useEffect(() => {
    getAllUsers();
  }, []);

  return {
    allUsers,
    userIdMap,
    getAllUsers,
  }
}

export default useUsers;