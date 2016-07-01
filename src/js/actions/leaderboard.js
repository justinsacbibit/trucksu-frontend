import Constants from '../constants';
import { push } from 'react-router-redux';
import { httpGet, httpPost } from '../utils';

const Actions = {
  fetchLeaderboard: () => {
    return dispatch => {
      dispatch({ type: Constants.LEADERBOARD_FETCHING });

      // TODO: Dispatch error action when appropriate

      httpGet('/v1/ranks')
      .then((data) => {
        dispatch({
          type: Constants.LEADERBOARD_RECEIVED,
          leaderboard: data,
        });
      });
    };
  },
};

export default Actions;

