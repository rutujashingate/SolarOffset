import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  USER_LOADING,
} from '../actions/types';

/**
 * Initial state for auth reducer
 * @type {{isLoading: boolean, isAuthenticated: null, user: null, token: string}}
 */
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

/**
 * Auth reducer
 * @param state
 * @param action
 * @returns {{isLoading: boolean, isAuthenticated: null, user: null, token: string}|{isLoading: boolean, isAuthenticated: boolean, user, token: string}|{isLoading: boolean, isAuthenticated: boolean, user: null, token: null}|(*&{isLoading: boolean, isAuthenticated: boolean, user: null, token: string})}
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
