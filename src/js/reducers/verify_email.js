import Constants from '../constants';

const initialState = {
  succeeded: null,
  loading: true,
  resend: {
    errors: [],
    succeeded: null,
    loading: false,
  },
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case Constants.VERIFY_EMAIL_LOADING:
    return { ...state, loading: true };

  case Constants.VERIFY_EMAIL_COMPLETED:
    return { ...state, succeeded: true, loading: false };

  case Constants.VERIFY_EMAIL_ERROR:
    return { ...state, succeeded: false, loading: false };

  case Constants.RESEND_VERIFICATION_EMAIL_LOADING:
    return {
      ...state,
      resend: {
        ...state.resend,
        errors: [],
        loading: true,
      },
    };

  case Constants.RESEND_VERIFICATION_EMAIL_COMPLETED:
    return {
      ...state,
      resend: {
        ...state.resend,
        succeeded: true,
        loading: false,
      },
    };

  case Constants.RESEND_VERIFICATION_EMAIL_ERROR:
    return {
      ...state,
      resend: {
        ...state.resend,
        errors: action.errors,
        loading: false,
      },
    };

  default:
    return state;
  }
}

