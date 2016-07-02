import Constants from '../constants';

const initialState = {
  currentUser: null,
  socket: null,
  channel: null,
  error: null,
  loading: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case Constants.CURRENT_USER:
    return {
      ...state,
      currentUser: action.currentUser,
      socket: action.socket,
      channel: action.channel,
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
