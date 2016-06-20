import Constants from '../constants';

const initialState = {
  beatmap: null,
  fetching: true,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case Constants.BEATMAPSET_FETCHING:
      return {
        ...state,
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

    default:
      return state;
  }
}

