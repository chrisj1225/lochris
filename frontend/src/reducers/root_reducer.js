import { combineReducers } from 'redux';
import sessionState from 'session_reducer';

const RootReducer = combineReducers({
  sessionState,
});

export default RootReducer;
