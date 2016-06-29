import Constants from '../constants';

const initialState = {
  succeeded: null,
  loading: true,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case Constants.VERIFY_EMAIL_LOADING:
      return { ...state, loading: true };

    case Constants.VERIFY_EMAIL_COMPLETED:
      return { ...state, succeeded: true, loading: false };

    case Constants.VERIFY_EMAIL_ERROR:
      return { ...state, succeeded: false, loading: false };

    default:
      return state;
  }
}

