import {
  RECEIVE_ALL_RSVPS,
  RECEIVE_RSVP,
} from '../../actions/rsvp_actions';

import {
  RECEIVE_USER_LOGOUT,
} from '../../actions/session_actions';

const initialState = {
  currentRsvp: {},
  allRsvps: [],
}

const rsvpState = (state = initialState, action) => {
  switch(action.type) {
    case RECEIVE_ALL_RSVPS:
      return {
        ...state,
        allRsvps: action.rsvps,
      }
    case RECEIVE_RSVP:
      return {
        ...state,
        currentRsvp: action.rsvp,
      }
    case RECEIVE_USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default rsvpState;