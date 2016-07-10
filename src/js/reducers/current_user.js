import Constants from '../constants';

const initialState = {
  user: null,
  fetching: true,
  errorMessage: '',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case Constants.USER_FETCHING:
    return { ...state, fetching: true };

  case Constants.USER_RECEIVED:
    return { ...state, user: action.user, fetching: false };

  case Constants.USER_ERROR:
    return {
      ...state,
      fetching: false,
      errorMessage: action.errorMessage,
    };

  default:
    return state;
  }
}
