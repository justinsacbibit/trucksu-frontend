import { push } from 'react-router-redux';
import Constants from '../constants';
import { httpPost } from '../utils';
import { setCurrentUser } from './sessions';

const Actions = {};

Actions.signUp = (body) => {
  return dispatch => {
    httpPost('/v1/registrations', { user: body })
    .then((data) => {
      localStorage.setItem('trucksuAuthToken', data.jwt);

      setCurrentUser(dispatch, data.user);

      dispatch(push('/'));
    })
    .catch((error) => {
      error.response.json()
      .then((errorJSON) => {
        dispatch({
          type: Constants.REGISTRATIONS_ERROR,
          errors: errorJSON.errors,
        });
      });
    });
  };
};

export default Actions;
