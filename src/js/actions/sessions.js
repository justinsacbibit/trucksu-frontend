import { push } from 'react-router-redux';
import Constants from '../constants';
import { Socket } from '../phoenix';
import { httpGet, httpPost, httpDelete } from '../utils';

export function setCurrentUser(dispatch, user) {
  dispatch({
    type: Constants.CURRENT_USER,
    currentUser: user,
  });
}

const Actions = {
  signIn: (username, password) => {
    return dispatch => {
      const data = {
        session: {
          username,
          password,
        },
      };

      httpPost('/v1/sessions', data)
      .then((data) => {
        localStorage.setItem('trucksuAuthToken', data.jwt);
        setCurrentUser(dispatch, data.user);
        dispatch(push('/'));
      })
      .catch((error) => {
        error.response.json()
        .then((errorJSON) => {
          dispatch({
            type: Constants.SESSIONS_ERROR,
            error: errorJSON.error,
          });
        });
      });
    };
  },

  currentUser: () => {
    return dispatch => {
      const authToken = localStorage.getItem('trucksuAuthToken');

      dispatch({
        type: Constants.CURRENT_USER_FETCHING,
      });

      httpGet('/v1/current-user')
      .then(function(data) {
        setCurrentUser(dispatch, data);
      })
      .catch(function(error) {
        console.log(error);
        dispatch(push('/sign-in'));
      });
    };
  },

  signOut: () => {
    return dispatch => {
      httpDelete('/v1/sessions')
      .then((data) => {
        localStorage.removeItem('trucksuAuthToken');

        dispatch({ type: Constants.USER_SIGNED_OUT });

        dispatch(push('/'));

        // TODO: ?
        dispatch({ type: Constants.BOARDS_FULL_RESET });
      })
      .catch(function(error) {
        console.log(error);
      });
    };
  },
};

export default Actions;
