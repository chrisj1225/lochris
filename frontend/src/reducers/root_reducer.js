import { combineReducers } from 'redux';
import sessionState from './session/session_reducer';
import rsvpState from './rsvp/rsvp_reducer';
import userState from './user/user_reducer';
import errors from './errors/errors_reducer';

const RootReducer = combineReducers({
  session: sessionState,
  rsvps: rsvpState,
  users: userState,
  errors,
});

export default RootReducer;
