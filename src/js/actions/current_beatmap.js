import Constants from '../constants';
import {
  httpGet,
  httpPost,
} from '../utils';

const Actions = {
  fetchBeatmapset: (beatmapId) => {
    return dispatch => {
      dispatch({ type: Constants.BEATMAPSET_FETCHING });

      httpGet(`/v1/beatmapsets?beatmap_id=${beatmapId}`)
      .then((data) => {
        dispatch({
          type: Constants.BEATMAPSET_RECEIVED,
          beatmapset: data,
        });
      }, (error) => {
        dispatch({
          type: Constants.BEATMAPSET_ERROR,
          error,
        });
      });
    };
  },
};

export default Actions;
