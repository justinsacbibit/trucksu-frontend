import Constants from '../constants';

const initialState = {
  beatmapset: null,
  fetching: true,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case Constants.BEATMAPSET_FETCHING:
    return {
      ...state,
      beatmapset: null,
      fetching: true,
    };

  case Constants.BEATMAPSET_RECEIVED:
    return {
      ...state,
      beatmapset: action.beatmapset,
      fetching: false,
    };

  case Constants.BEATMAPSET_ERROR:
    return {
      ...state,
      error: action.error,
      fetching: false,
    };

  case Constants.BEATMAPSET_RESET:
    return initialState;

  default:
    return state;
  }
}

