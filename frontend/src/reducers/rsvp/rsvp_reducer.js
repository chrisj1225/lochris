import {
  RECEIVE_ALL_RSVPS,
  RECEIVE_RSVP,
} from '../../actions/rsvp_actions';

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
    default:
      return state;
  }
}

export default rsvpState;