import axios from 'axios';
import { createAction, handleActions } from 'redux-actions';

const ROOT_URL = 'http://localhost:3030';
const AUTH_USER = 'AUTH_USER';
const UNAUTH_USER = 'UNAUTH_USER';
const AUTH_ERROR = 'AUTH_ERROR';

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

export const authError = createAction(AUTH_ERROR);

const initialState = {};

export default handleActions(
  {
    AUTH_USER: (state, action) => {
      return {
        ...state,
        authenticated: true
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
    }
  },
  initialState
);
