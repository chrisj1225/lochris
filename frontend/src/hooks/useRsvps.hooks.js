import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchAllRsvps,
  fetchUserRsvp,
  createNewRsvp,
} from '../actions/rsvp_actions';

const useRsvps = () => {
  const dispatch = useDispatch();

  const {
    currentRsvp,
    allRsvps,
  } = useSelector((state) => state.rsvps);

  const getAllRsvps = () => {
    dispatch(fetchAllRsvps());
  };

  const getUserRsvp = (userId) => {
    dispatch(fetchUserRsvp(userId));
  };

  const createRsvp = (data) => {
    dispatch(createNewRsvp(data));
  }

  return {
    currentRsvp,
    allRsvps,
    getAllRsvps,
    getUserRsvp,
    createRsvp,
  }
}

export default useRsvps;