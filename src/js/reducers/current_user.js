import Constants from '../constants';

const initialState = {
  user: null,
  fetching: true,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case Constants.USER_FETCHING:
    return { ...state, fetching: true };

  case Constants.USER_RECEIVED:
    return { ...state, user: action.user, fetching: false };

  case Constants.USER_ERROR:
      // TODO
    return state;

  default:
    return state;
  }
}

