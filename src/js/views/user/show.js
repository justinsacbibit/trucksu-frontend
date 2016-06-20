import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import CircularProgress from 'material-ui/CircularProgress';
// import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import Actions from '../../actions/current_user';
import Constants from '../../constants';
import { setDocumentTitle } from '../../utils';

import { getModsArray } from '../../utils/osu';

const styles = {
  h2: {
    fontFamily: 'Roboto,sans-serif',
    fontWeight: 400,
  },
  h3: {
    fontFamily: 'Roboto,sans-serif',
    fontWeight: 400,
  },
};

class UserShowView extends React.Component {
  static propTypes = {
    currentUser: PropTypes.shape({
    }).isRequired,
    loggedInUser: PropTypes.object,
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    this.props.dispatch(Actions.fetchUser(this.props.params.userId));
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props.currentUser;
    if (user && !prevProps.currentUser.user) {
      setDocumentTitle(`${user.username}'s profile`);
    }
  }

  _handleBeatmapClick(beatmapId, e) {
    e.preventDefault();
    this.props.dispatch(push(`/beatmaps/${beatmapId}`));
  }

  _renderScoresTable(scores) {
    return (
      <Paper style={{width: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'column'}} zDepth={1}>
        {scores.map((score, index) => {
          let mods = getModsArray(score.mods).join(',');
          mods = mods ? '+' + mods + ' ' : mods;
          return (
            <div key={index}>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <a
                  href={`/beatmaps/${score.beatmap.id}`}
                  onClick={this._handleBeatmapClick.bind(this, score.beatmap.id)}
                  style={{textDecoration: 'none'}}>
                  {`${score.beatmap.beatmapset.artist} - ${score.beatmap.beatmapset.title} (${score.beatmap.beatmapset.creator}) [${score.beatmap.version}]`}
                </a>
                &nbsp;{`${mods}(${score.rank ? score.rank + ' rank, ' : ''}${(score.accuracy * 100).toFixed(2)}%, ${score.max_combo}x)`}
                <div style={{flex: 1}} />
                {score.pp ?
                  <strong>
                    {score.pp.toFixed(2)}pp
                  </strong>
                  : 'N/A'
                }
              </div>
              <Divider />
            </div>
          );
        })}
      </Paper>
    );
  }

  _renderFirstPlaceScoresTable(scores) {
    return (
      <div>
        <h2 style={{fontFamily: 'Roboto,sans-serif', borderBottom: '1px solid #eee', paddingBottom: '.3em', fontWeight: 400}}>First Place Ranks</h2>
        {this._renderScoresTable(scores)}
      </div>
    );
  }

  render() {
    const { fetching, user } = this.props.currentUser;

    if (fetching) {
      return (
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', paddingTop: 30}}>
          <CircularProgress size={2} />
        </div>
      );
    }

    const [stats] = user.stats;

    return (
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
        <div style={{width: 965}}>
          <div style={{display: 'flex', flexDirection: 'row', borderBottom: '1px solid #eee', width: '100%', marginBottom: 20}}>
            <h2 style={{...styles.h2, fontWeight: 500, display: 'flex', fontSize: '30px', margin: 0, alignItems: 'center'}}>{user.username}</h2>
            <div style={{flex: 1}}></div>
            <div style={{display: 'flex', alignItems: 'flex-end', flexDirection: 'column'}}>
              <h2 style={{...styles.h2, marginBottom: 0}}>#{stats.rank} <span style={{fontWeight: 200}}>in osu! Standard</span></h2>
              <h3 style={{...styles.h3, marginTop: 0}}><strong>{stats.pp.toFixed(2)}pp</strong></h3>
            </div>
          </div>
          {this._renderScoresTable(stats.scores)}
          {this._renderFirstPlaceScoresTable(stats.first_place_scores)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedInUser: state.session.currentUser,
  currentUser: state.currentUser,
});

export default connect(mapStateToProps)(UserShowView);
