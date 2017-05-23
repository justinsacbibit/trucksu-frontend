import Constants from '../constants';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  socket: null,
  usersChannel: null,
  matchesChannel: null,

  // view
  showLoggedOutSnackbar: false,
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

  case Constants.MATCHES_CHANNEL_CONNECTED:
  case Constants.MATCHES_CHANNEL_DISCONNECTED:
    return {
      ...state,
      matchesChannel: action.channel,
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
      error: null,
    };

  case Constants.CURRENT_USER_ERROR:
    return {
      ...state,
      loading: false,
      error: action.error.toString(),
    };

  case Constants.USER_SIGNED_OUT:
    return {
      ...initialState,
      showLoggedOutSnackbar: true,
    };

  case Constants.CLOSED_LOGGED_OUT_SNACKBAR:
    return {
      ...state,
      showLoggedOutSnackbar: false,
    };

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
