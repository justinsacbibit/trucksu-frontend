import Constants from '../constants';
import { httpPost, apiUrl } from '../utils';

const Actions = {
  verifyEmail: (token) => {
    return dispatch => {
      dispatch({ type: Constants.VERIFY_EMAIL_LOADING });

      httpPost('/v1/verify-email', { token })
      .then((data) => {
        dispatch({
          type: Constants.VERIFY_EMAIL_COMPLETED,
        });
      })
      .catch((error) => {
        dispatch({
          type: Constants.VERIFY_EMAIL_ERROR,
          error,
        });
      });
    };
  },

  resendVerificationEmail: ({ username, email } = {}) => (dispatch) => {
    dispatch({ type: Constants.RESEND_VERIFICATION_EMAIL_LOADING });

    const body = {};
    if (username) {
      body.username = username;
    } else if (email) {
      body.email = email;
    }

    httpPost('/v1/resend-verification-email', body)
    .then((data) => {
      dispatch({
        type: Constants.RESEND_VERIFICATION_EMAIL_COMPLETED,
      });
    })
    .catch((error) => {
      dispatch({
        type: Constants.RESEND_VERIFICATION_EMAIL_ERROR,
        error,
      });
    });
  },
};

export default Actions;
