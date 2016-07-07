import { push } from 'react-router-redux';
import Constants from '../constants';
import { Socket } from '../phoenix';
import { httpGet, httpPost, httpDelete, socketUrl } from '../utils';

export function setCurrentUser(dispatch, user) {
  dispatch({
    type: Constants.CURRENT_USER,
    currentUser: user,
  });
}

const Actions = {
  connectToSocket: () => (dispatch) => {
    const socket = new Socket(socketUrl());

    socket.connect();

    const channel = socket.channel('users');

    channel.on('user_online', (response) => {
      dispatch({
        type: Constants.BANCHO_USER_ONLINE,
        user: response.user,
      });
    });

    channel.on('user_offline', (response) => {
      dispatch({
        type: Constants.BANCHO_USER_OFFLINE,
        user: response.user,
      });
    });

    channel.on('user_change_action', (response) => {
      dispatch({
        type: Constants.BANCHO_USER_CHANGE_ACTION,
        user: response.user,
      });
    });

    channel.join()
    .receive('ok', (response) => {
      channel.push('get:users')
      .receive('ok', response => {
        dispatch({
          type: Constants.SOCKET_CONNECTED,
          socket,
          channel,
          users: response.users,
        });
      });
    })
    .receive('error', ({reason}) => console.log('failed join', reason))
    .receive('timeout', () => console.log('Networking issue'));
  },

  signIn: (username, password) => {
    return dispatch => {
      const body = {
        session: {
          username,
          password,
        },
      };

      httpPost('/v1/sessions', body)
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
      dispatch({
        type: Constants.CURRENT_USER_FETCHING,
      });

      httpGet('/v1/current-user')
      .then((data) => {
        setCurrentUser(dispatch, data);
      })
      .catch((error) => {
        console.log(error);
        dispatch(push('/sign-in'));
      });
    };
  },

  signOut: () => {
    return dispatch => {
      httpDelete('/v1/sessions')
      .then(() => {
        localStorage.removeItem('trucksuAuthToken');

        dispatch({ type: Constants.USER_SIGNED_OUT });

        dispatch(push('/'));

        // TODO: ?
        dispatch({ type: Constants.BOARDS_FULL_RESET });
      })
      .catch((error) => {
        console.log(error);
      });
    };
  },
};

export default Actions;
