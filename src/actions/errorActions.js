import { CLEAR_ERRORS, GET_ERRORS } from './types';

/**
 * Error Wrapper
 * @param msg
 * @param status
 * @param id
 * @returns {{payload: {msg, id: null, status}, type: string}}
 */
export const returnErrors = (msg, status, id = null) => ({
  type: GET_ERRORS,
  payload: { msg, status, id },
});

/**
 * Clear Error Wrapper
 * @returns {{type: string}}
 */
export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});
