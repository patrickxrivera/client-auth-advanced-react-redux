import axios from 'axios';

const ROOT_URL = 'http://localhost:3030';

export const signInUser = ({ email, password }) => {
  return (dispatch) => {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password });
  }
}
