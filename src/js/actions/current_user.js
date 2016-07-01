import Constants from '../constants';
import { httpGet, httpPost } from '../utils';

const Actions = {
  fetchUser: (userId) => {
    return dispatch => {
      dispatch({ type: Constants.USER_FETCHING });

      httpGet(`/v1/users/${userId}`)
      .then((data) => {
        dispatch({
          type: Constants.USER_RECEIVED,
          user: data,
        });
      });
    };
  },
};

export default Actions;
