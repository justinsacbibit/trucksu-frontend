import Constants from '../constants';
import { httpGet } from '../utils';

const Actions = {
  joinUsersChannel: (socket) => (dispatch) => {
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
          type: Constants.USERS_CHANNEL_CONNECTED,
          socket,
          channel,
          users: response.users,
        });
      });
    })
    .receive('error', ({ reason }) => console.log('failed join', reason))
    .receive('timeout', () => console.log('Networking issue'));
  },
  leaveUsersChannel: () => (dispatch, getState) => {
    const { usersChannel } = getState().session;
    usersChannel.leave();
    dispatch({
      type: Constants.USERS_CHANNEL_DISCONNECTED,
      channel: null,
    });
  },
  joinMatchesChannel: (socket) => (dispatch) => {
    const channel = socket.channel('matches');

    channel.on('match_create', (response) => {
      dispatch({
        type: Constants.BANCHO_MATCH_CREATE,
        match: response.match,
      });
    });

    channel.on('match_update', (response) => {
      dispatch({
        type: Constants.BANCHO_MATCH_UPDATE,
        match: response.match,
      });
    });

    channel.on('match_destroy', (response) => {
      dispatch({
        type: Constants.BANCHO_MATCH_DESTROY,
        matchId: response.match.id,
      });
    });

    channel.join()
    .receive('ok', (response) => {
      dispatch({
        type: Constants.MATCHES_CHANNEL_CONNECTED,
        channel,
        matches: response.matches,
      });
    })
    .receive('error', ({ reason }) => console.log('Failed to join matches channel', reason))
    .receive('timeout', () => console.log('Networking issue'));
  },
  leaveMatchesChannel: () => (dispatch, getState) => {
    const { matchesChannel } = getState().session;
    matchesChannel.leave();
    dispatch({
      type: Constants.MATCHES_CHANNEL_DISCONNECTED,
      channel: null,
    });
  },
};

export default Actions;

