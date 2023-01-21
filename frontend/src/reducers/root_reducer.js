import { combineReducers } from 'redux';
import sessionState from './session/session_reducer';
import errors from './errors/errors_reducer';

const RootReducer = combineReducers({
  session: sessionState,
  errors,
});

export default RootReducer;
