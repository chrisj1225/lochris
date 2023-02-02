import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchAllRsvps,
  fetchUserRsvp,
  createNewRsvp,
  editRsvp,
} from '../actions/rsvp_actions';

const useRsvps = (userId) => {
  const [rsvpFetched, setRsvpFetched] = React.useState(false);
  const dispatch = useDispatch();

  const {
    currentRsvp,
    allRsvps,
  } = useSelector((state) => state.rsvps);

  const getAllRsvps = (callback) => {
    dispatch(fetchAllRsvps(callback));
  };
  
  const getUserRsvp = (userId, callback) => {
    dispatch(fetchUserRsvp(userId, callback));
  };
  
  const createRsvp = (data, callback) => {
    dispatch(createNewRsvp(data, callback));
  }

  const updateRsvp = (rsvpId, data, callback) => {
    dispatch(editRsvp(rsvpId, data, callback));
  }

  React.useEffect(() => {
    getUserRsvp(userId, () => setRsvpFetched(true));
  }, []);

  return {
    rsvpFetched,
    currentRsvp,
    allRsvps,
    getAllRsvps,
    getUserRsvp,
    createRsvp,
    updateRsvp,
  }
}

export default useRsvps;