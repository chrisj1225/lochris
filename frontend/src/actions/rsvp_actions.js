import * as rsvpsApi from '../util/rsvpsApi';

export const RECEIVE_RSVP = "RECEIVE_RSVP";
export const RECEIVE_ALL_RSVPS = "RECEIVE_ALL_RSVPS";

export const receiveRsvp = (rsvp) => ({
  type: RECEIVE_RSVP,
  rsvp,
});

export const receiveAllRsvps = (rsvps) => ({
  type: RECEIVE_ALL_RSVPS,
  rsvps,
});

export const fetchAllRsvps = () => dispatch => (
  rsvpsApi.getAllRsvps()
    .then(res => {
      dispatch(receiveAllRsvps(res.data));
    })
);

export const fetchUserRsvp = (userId) => dispatch => (
  rsvpsApi.getUserRsvp(userId)
    .then(res => {
      dispatch(receiveRsvp(res.data));
    })
);

export const fetchRsvp = (rsvpId) => dispatch => (
  rsvpsApi.getRsvp(rsvpId)
    .then(res => {
      dispatch(receiveRsvp(res.data));
    })
);

export const createNewRsvp = (newRsvp) => dispatch => (
  rsvpsApi.createRsvp(newRsvp)
    .then(res => {
      dispatch(receiveRsvp(res.data));
    })
);
