import Constants from '../constants';

const initialState = {
  leaderboard: null,
  fetching: true,
  error: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case Constants.LEADERBOARD_FETCHING:
    return {
      ...state,
      fetching: true,
      error: null,
    };

  case Constants.LEADERBOARD_RECEIVED:
    return {
      ...state,
      leaderboard: action.leaderboard,
      fetching: false,
      error: null,
    };

  case Constants.LEADERBOARD_ERROR:
    return {
      ...state,
      error: action.error,
      fetching: false,
    };

  default:
    return state;
  }
}
