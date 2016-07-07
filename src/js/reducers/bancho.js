import Constants from '../constants';
import _ from 'lodash';

const initialState = {
  users: {},
  channels: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case Constants.USER_CHANNEL_DISCONNECTED:
  case Constants.USER_CHANNEL_CONNECTED: {
    const channels = { ...state.channels };
    channels[action.userId] = action.channel;
    const users = { ...state.users };
    users[action.userId] = action.user;
    return {
      ...state,
      users,
      channels,
    };
  }

  case Constants.USERS_CHANNEL_CONNECTED: {
    const users = { ...state.users };
    action.users.forEach((user) => {
      users[user.id] = user;
    });
    return {
      ...state,
      users,
    };
  }

  case Constants.BANCHO_USER_OFFLINE: {
    const users = { ...state.users };
    delete users[action.user.id];
    return {
      ...state,
      users,
    };
  }

  case Constants.BANCHO_USER_ONLINE:
  case Constants.BANCHO_USER_CHANGE_ACTION: {
    const users = { ...state.users };
    users[action.user.id] = action.user;
    return {
      ...state,
      users,
    };
  }

  default:
    return state;
  }
}

