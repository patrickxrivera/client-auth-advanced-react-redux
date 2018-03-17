import axios from 'axios';
import { createAction, handleActions } from 'redux-actions';

const ROOT_URL = 'http://localhost:3030';
export const AUTH_USER = 'AUTH_USER';
const UNAUTH_USER = 'UNAUTH_USER';
const AUTH_ERROR = 'AUTH_ERROR';
const FETCH_MESSAGE = 'FETCH_MESSAGE';

export const signInUser = ({ email, password }, callback) => {
  return (dispatch) => {
    // Submit email/password to the server
    axios
      .post(`${ROOT_URL}/signin`, { email, password })
      .then((response) => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
        // - redirect to the route '/feature'
        callback();
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  };
};

export const signOutUser = () => {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
};

export const signUpUser = ({ email, password }, callback) => {
  return (dispatch) => {
    axios
      .post(`${ROOT_URL}/signup`, { email, password })
      .then((response) => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        callback();
      })
      .catch((response) => dispatch(authError(response.data.error)));
  };
};

export const authError = createAction(AUTH_ERROR);

export const fetchMessage = () => {
  return (dispatch) => {
    axios
      .get(ROOT_URL, {
        headers: { authorization: localStorage.getItem('token') }
      })
      .then((response) => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  };
};

const initialState = {};

export default handleActions(
  {
    AUTH_USER: (state, action) => {
      return {
        ...state,
        authenticated: true,
        errorMsg: ''
      };
    },
    UNAUTH_USER: (state, action) => {
      return {
        ...state,
        authenticated: false
      };
    },
    AUTH_ERROR: (state, action) => {
      const errorMsg = action.payload;
      return {
        ...state,
        errorMsg
      };
    },
    FETCH_MESSAGE: (state, action) => {
      const msg = action.payload;
      return {
        ...state,
        msg
      };
    }
  },
  initialState
);
