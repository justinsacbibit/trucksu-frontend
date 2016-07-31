import Constants from '../constants';
import { httpGet } from '../utils';

const Actions = {
  fetchLeaderboard: () => {
    return dispatch => {
      dispatch({ type: Constants.LEADERBOARD_FETCHING });

      httpGet('/v1/ranks')
      .then((data) => {
        dispatch({
          type: Constants.LEADERBOARD_RECEIVED,
          leaderboard: data,
        });
      })
      .catch((error) => {
        dispatch({
          type: Constants.LEADERBOARD_ERROR,
          error,
        });
      });
    };
  },
};

export default Actions;
