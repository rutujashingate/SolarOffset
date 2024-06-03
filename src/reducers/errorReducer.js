import { CLEAR_ERRORS, GET_ERRORS } from '../actions/types';

/**
 * Initial state for error reducer
 * @type {{msg: {}, id: null, status: null}}
 */
const initialState = {
  msg: {},
  status: null,
  id: null,
};

/**
 * Error reducer
 * @param state
 * @param action
 * @returns {{msg, id, status}|{msg: {}, id: null, status: null}}
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      };
    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null,
      };
    default:
      return state;
  }
}
