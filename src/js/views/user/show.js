import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Dropzone from 'react-dropzone';

import CircularProgress from 'material-ui/CircularProgress';
// import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

import Actions from '../../actions/current_user';
import {
  setDocumentTitle,
  avatarUrl,
  httpPostFile,
} from '../../utils';

import { getModsArray } from '../../utils/osu';

const styles = {
  h3: {
    fontFamily: 'Roboto,sans-serif',
    fontWeight: 400,
  },
};

class UserShowView extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,

    currentUser: PropTypes.shape({
      fetching: PropTypes.bool,
      user: PropTypes.shape({
        id: PropTypes.any,
      }),
    }).isRequired,
    loggedInUser: PropTypes.shape({
      id: PropTypes.any,
    }),
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    this.props.dispatch(Actions.fetchUser(this.props.params.userId));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.userId !== this.props.params.userId) {
      this.props.dispatch(Actions.fetchUser(nextProps.params.userId));
    }
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

  _onDrop = (files) => {
    const data = new FormData();
    data.append('avatar', files[0]);
    httpPostFile('/v1/me/avatar', data)
    .then(() => location.reload())
    .catch((err) => alert(`Something went wrong...: ${err.message}`));
  }

  _onPressUpload = () => {
    this.refs.dropzone.open();
  }

  _renderScoresTable(scores, showWeighting) {
    return (
      <Paper style={{ width: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'column' }} zDepth={1}>
        {scores.map((score, index) => {
          let mods = getModsArray(score.mods).join(',');
          mods = mods ? '+' + mods + ' ' : mods;
          let rank = '';
          if (score.rank) {
            rank = score.rank;

            if (rank === 'X') {
              rank = 'SS';
            } else if (rank === 'XH') {
              rank = 'SSH';
            }
          }
          const weight = Math.pow(0.95, index);
          return (
            <div key={index}>
              <div style={{ display: 'flex', flexDirection: 'row', padding: 5 }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '65%' }}>
                  <a
                    href={`/beatmaps/${score.beatmap.id}`}
                    onClick={this._handleBeatmapClick.bind(this, score.beatmap.id)}
                    style={{ textDecoration: 'none' }}
                  >
                    <strong>{rank}</strong> {`${score.beatmap.beatmapset.artist} - ${score.beatmap.beatmapset.title} [${score.beatmap.version}]`}
                  </a>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    Mapped by&nbsp;
                    <a
                      href={`http://new.ppy.sh/u/${score.beatmap.beatmapset.creator}`}
                      style={{ textDecoration: 'none' }}
                    >
                      {score.beatmap.beatmapset.creator}
                    </a>
                  </div>
                </div>
                &nbsp;{mods ? <strong>{mods}&nbsp;</strong> : mods}{`(${(score.accuracy * 100).toFixed(2)}%, ${score.max_combo}x)`}
                <div style={{ flex: 1 }} />
                {score.pp ?
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <strong style={{ fontSize: 20 }}>
                      {Math.round(score.pp)}pp
                    </strong>
                    {showWeighting ?
                      <span
                        style={{ fontSize: 12 }}
                        title={`weighted ${Math.round(weight * 100)}%`}
                      >
                        ({Math.round(score.pp * weight)}pp)
                      </span>
                    : null}
                  </div>
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
        <h3 style={{ fontFamily: 'Roboto,sans-serif', borderBottom: '1px solid #eee', paddingBottom: '.3em', fontWeight: 400 }}>First Place Ranks</h3>
        {this._renderScoresTable(scores)}
      </div>
    );
  }

  _renderAvatar() {
    const avatar = (
      <Avatar
        size={128}
        src={avatarUrl(`/${this.props.currentUser.user.id}`)}
        style={{ borderRadius: 0 }}
      />
    );

    if (this.props.loggedInUser && Number(this.props.currentUser.user.id) === Number(this.props.loggedInUser.id)) {
      return (
        <div>
          <Dropzone
            accept='image/*'
            multiple={false}
            onDrop={this._onDrop}
            ref='dropzone'
            style={{ cursor: 'pointer' }}
          >
            {avatar}
          </Dropzone>
        </div>
      );
    }

    return avatar;
  }

  render() {
    const { fetching, user } = this.props.currentUser;

    if (fetching) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', paddingTop: 30 }}>
          <CircularProgress size={2} />
        </div>
      );
    }

    const [stats] = user.stats;

    return (
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginTop: 20 }}>
        <div style={{ width: 965 }}>
          <div style={{ display: 'flex', flexDirection: 'row', borderBottom: '1px solid #eee', width: '100%', marginBottom: 20 }}>
            <h3 style={{ ...styles.h3, fontWeight: 500, display: 'flex', fontSize: '30px', margin: 0, alignItems: 'center', marginBottom: 20 }}>
              {this._renderAvatar()}
              &nbsp;
              {user.username}
            </h3>
            <div style={{ flex: 1 }}></div>
            <div style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
              <h3 style={{ ...styles.h3, marginBottom: 0 }}>#{stats.rank} <span style={{ fontWeight: 200 }}>in osu! Standard</span></h3>
              <h3 style={{ ...styles.h3, marginTop: 0, marginBottom: 0 }}><strong>{Math.round(stats.pp)}pp</strong></h3>
            </div>
          </div>
          {this._renderScoresTable(stats.scores, true)}
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
