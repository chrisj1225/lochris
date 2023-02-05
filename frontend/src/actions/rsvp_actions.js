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

// export const fetchAllRsvps = (callback) => dispatch => (
//   rsvpsApi.getAllRsvps()
//     .then(res => {
//       dispatch(receiveAllRsvps(res.data));

//       if (callback) {
//         callback();
//       }
//     })
// );

export const fetchUserRsvp = (userId, callback) => dispatch => (
  rsvpsApi.getUserRsvp(userId)
    .then(res => {
      dispatch(receiveRsvp(res.data));

      if (callback) {
        callback();
      }
    })
);

export const fetchRsvp = (rsvpId) => dispatch => (
  rsvpsApi.getRsvp(rsvpId)
    .then(res => {
      dispatch(receiveRsvp(res.data));
    })
);

export const createNewRsvp = (newRsvp, callback) => dispatch => (
  rsvpsApi.createRsvp(newRsvp)
    .then(res => {
      dispatch(receiveRsvp(res.data));
      // Add logic to send email confirmations
      if (callback) {
        callback();
      }
    })
);

export const editRsvp = (rsvpId, rsvp, callback) => dispatch => (
  rsvpsApi.editRsvp(rsvpId, rsvp)
    .then(res => {
      dispatch(receiveRsvp(res.data));
      // Add logic to send email confirmations
      if (callback) {
        callback();
      }
    })
);
