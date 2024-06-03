import axios from 'axios';
import { returnErrors } from './errorActions';

import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  USER_LOADING,
} from './types';

import { getUserToken } from '../utils/helpers.js';

/**
 * Get token from localstorage and add it to headers
 * @returns {{headers: {"Content-type": string}}}
 */
export const tokenConfig = () => {
  // Get token from localstorage
  const token = getUserToken();

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};

/**
 * Check token & load user
 * @returns {(function(*): void)|*}
 */
export const loadUser = () => (dispatch) => {
  dispatch({ type: USER_LOADING });

  axios
    .get('/auth/user', tokenConfig())
    .then((res) => dispatch({
      type: USER_LOADED,
      payload: res.data,
    }))
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

/**
 * Register user
 * @param firstname
 * @param lastname
 * @param username
 * @param email
 * @param password
 * @param role
 * @param country
 * @returns {(function(*): void)|*}
 */
export const register = ({
  firstname, lastname, username, email, password, role, country,
}) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({
    firstname, lastname, username, email, password, role, country,
  });

  axios
    .post('/auth/signup', body, config)
    .then((res) => dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    }))
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'),
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

/**
 * Login user
 * @param email
 * @param password
 * @returns {(function(*): void)|*}
 */
export const login = ({ email, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post('/auth/login', body, config)
    .then((res) => dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    }))
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'),
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

/**
 * Logout user
 * @returns {{type: string}}
 */
export const logout = () => ({
  type: LOGOUT_SUCCESS,
});
