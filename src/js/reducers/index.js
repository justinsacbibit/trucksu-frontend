import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import session from './session';
import registration from './registration';
import header from './header';
import leaderboard from './leaderboard';
import currentUser from './current_user';
import currentBeatmap from './current_beatmap';
import verifyEmail from './verify_email';

export default combineReducers({
  routing: routerReducer,
  session,
  registration,
  header,
  leaderboard,
  currentUser,
  currentBeatmap,
  verifyEmail,
});
