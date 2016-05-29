import Constants from '../constants';

const initialState = {
  leaderboard: null,
  fetching: true,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case Constants.LEADERBOARD_FETCHING:
      return { ...state, fetching: true };

    case Constants.LEADERBOARD_RECEIVED:
      return { ...state, leaderboard: action.leaderboard, fetching: false };

    case Constants.LEADERBOARD_ERROR:
      // TODO
      return state;

    default:
      return state;
  }
}

