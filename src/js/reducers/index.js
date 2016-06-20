import { combineReducers }  from 'redux';
import { routerReducer }    from 'react-router-redux';
import session              from './session';
import registration         from './registration';
import boards               from './boards';
import currentBoard         from './current_board';
import currentCard          from './current_card';
import header               from './header';
import leaderboard from './leaderboard';
import currentUser from './current_user';
import currentBeatmap from './current_beatmap';

export default combineReducers({
  routing: routerReducer,
  session,
  registration,
  boards,
  currentBoard,
  currentCard,
  header,
  leaderboard,
  currentUser,
  currentBeatmap,
});
