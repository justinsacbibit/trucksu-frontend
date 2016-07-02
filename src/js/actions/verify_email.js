import Constants from '../constants';
import { httpPost } from '../utils';

const verifyEmail = (token) => {
  return dispatch => {
    dispatch({ type: Constants.VERIFY_EMAIL_LOADING });

    httpPost('/v1/verify-email', { token })
    .then((user) => {
      dispatch({
        type: Constants.VERIFY_EMAIL_COMPLETED,
        payload: {
          user,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: Constants.VERIFY_EMAIL_ERROR,
        error,
      });
    });
  };
};

const resendVerificationEmail = (input) => (dispatch) => {
  dispatch({ type: Constants.RESEND_VERIFICATION_EMAIL_LOADING });

  const body = {};
  if (input) {
    if (input.includes('@')) {
      body.email = input;
    } else {
      body.username = input;
    }
  }

  httpPost('/v1/resend-verification-email', body)
  .then(() => {
    dispatch({
      type: Constants.RESEND_VERIFICATION_EMAIL_COMPLETED,
    });
  })
  .catch((error) => {
    console.log(error);
    error.response.json()
    .then((errorJSON) => {
      dispatch({
        type: Constants.RESEND_VERIFICATION_EMAIL_ERROR,
        errors: errorJSON.errors,
      });
    });
  });
};

export default {
  verifyEmail,
  resendVerificationEmail,
};
export {
  verifyEmail,
  resendVerificationEmail,
};
