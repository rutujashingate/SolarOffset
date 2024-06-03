import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

/**
 * Combine all reducers into one root reducer
 */
export default combineReducers({
  auth: authReducer,
  error: errorReducer,
});
