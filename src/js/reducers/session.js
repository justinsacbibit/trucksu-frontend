import Constants from '../constants';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  socket: null,
  usersChannel: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case Constants.SOCKET_CONNECTED:
    return {
      ...state,
      socket: action.socket,
    };

  case Constants.USERS_CHANNEL_CONNECTED:
  case Constants.USERS_CHANNEL_DISCONNECTED:
    return {
      ...state,
      usersChannel: action.channel,
    };

  case Constants.CURRENT_USER:
    return {
      ...state,
      currentUser: action.currentUser,
      error: null,
      loading: false,
    };

  case Constants.CURRENT_USER_FETCHING:
    return {
      ...state,
      loading: true,
    };

  case Constants.USER_SIGNED_OUT:
    return initialState;

  case Constants.SESSIONS_ERROR:
    return { ...state, error: action.error };

  case Constants.VERIFY_EMAIL_COMPLETED:
    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        ...action.payload.user,
      },
    };

  default:
    return state;
  }
}
