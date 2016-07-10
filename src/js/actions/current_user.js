import Constants from '../constants';
import { httpGet } from '../utils';

const Actions = {
  fetchUser: (userId) => {
    return dispatch => {
      dispatch({ type: Constants.USER_FETCHING });

      httpGet(`/v1/users/${userId}`)
      .then((data) => {
        dispatch({
          type: Constants.USER_RECEIVED,
          user: data,
        });
      })
      .catch((error) => {
        let errorMessage = 'Something went wrong..';
        if (error.response.status === 404) {
          errorMessage = 'User not found!';
        }
        dispatch({
          type: Constants.USER_ERROR,
          error,
          errorMessage,
        });
      });
    };
  },
  joinUserChannel: (socket, userId) => (dispatch) => {
    userId = Number(userId);
    const channel = socket.channel(`users:${userId}`);

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
      dispatch({
        type: Constants.USER_CHANNEL_CONNECTED,
        socket,
        channel,
        userId,
        user: response.user,
      });
    })
    .receive('error', ({ reason }) => console.log('failed join', reason))
    .receive('timeout', () => console.log('Networking issue'));
  },
  leaveUserChannel: (userId) => (dispatch, getState) => {
    userId = Number(userId);
    const state = getState();
    const channel = state.bancho.channels[userId];
    if (!channel) {
      return;
    }
    channel.leave();
    dispatch({
      type: Constants.USER_CHANNEL_DISCONNECTED,
      user: null,
      userId,
      channel: null,
    });
  },
};

export default Actions;
