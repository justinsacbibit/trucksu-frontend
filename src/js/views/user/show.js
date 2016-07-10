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

import {
  getModsArray,
  getActionText,
  getGameModeText,
} from '../../utils/osu';

import Flag from '../../components/Flag';


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
        country: PropTypes.string,
      }),
      errorMessage: PropTypes.string,
    }).isRequired,
    loggedInUser: PropTypes.shape({
      id: PropTypes.any,
    }),
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
    }).isRequired,

    socket: PropTypes.any,

    banchoUser: PropTypes.shape({
      action: PropTypes.object.isRequired,
    }),
  };

  componentDidMount() {
    this.props.dispatch(Actions.fetchUser(this.props.params.userId));

    if (this.props.socket) {
      this.props.dispatch(Actions.joinUserChannel(this.props.socket, this.props.params.userId));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.userId !== this.props.params.userId) {
      if (this.props.socket) {
        this.props.dispatch(Actions.joinUserChannel(nextProps.socket, nextProps.params.userId));
        this.props.dispatch(Actions.leaveUserChannel(this.props.params.userId));
      }
      this.props.dispatch(Actions.fetchUser(nextProps.params.userId));
    } else {
      if (nextProps.socket && !this.props.socket) {
        this.props.dispatch(Actions.joinUserChannel(nextProps.socket, nextProps.params.userId));
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props.currentUser;
    if (user && !prevProps.currentUser.user) {
      setDocumentTitle(`${user.username}'s profile`);
    }
  }

  componentWillUnmount() {
    this.props.dispatch(Actions.leaveUserChannel(this.props.params.userId));
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

  _renderOnlineBanchoUser() {
    const { banchoUser } = this.props;
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div>
          In-game:&nbsp;
        </div>
        <div>
          {getActionText(banchoUser.action)}
        </div>
      </div>
    );
  }

  _renderOfflineBanchoUser() {
    return (
      <div>
        Offline
      </div>
    );
  }

  _renderStatRow(label, value) {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', width: 300 }}>
        {label}:<div style={{ flex: 1 }}/><strong>{value}</strong>
      </div>
    );
  }

  _renderHeader(user, stats) {
    const styles = {
      container: { display: 'flex', flexDirection: 'column', borderBottom: '1px solid #eee', width: '100%', paddingBottom: 12, marginBottom: 20 },
      upperContainer: { display: 'flex', flexDirection: 'row', width: '100%', marginBottom: 12 },
    };
    return (
      <div style={styles.container}>
        <div style={styles.upperContainer}>
          <div style={{ display: 'flex', alignItems: 'center', margin: 0 }}>
            {this._renderAvatar()}
            <div>
              <div style={{ alignItems: 'center', marginLeft: 6 }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <h3 style={{ ...styles.h3, margin: 0, fontWeight: 500, fontSize: '30px' }}>
                    {user.username}
                  </h3>
                  <div>
                    <Flag country={user.country} style={{ marginLeft: 6 }} />
                  </div>
                </div>
                {user.groups.filter(({ id }) => id !== 1).map(group => {
                  return (
                    <div key={group.id}>
                      {group.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }}></div>
          <div style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
            <h3 style={{ ...styles.h3, marginBottom: 0 }}>#{stats.rank} <span style={{ fontWeight: 200 }}>in {getGameModeText(stats.game_mode)}</span></h3>
            <h3 style={{ ...styles.h3, marginTop: 0, marginBottom: 0 }}><strong>{Math.round(stats.pp).toLocaleString()}pp</strong></h3>

            <div style={{ marginTop: 20 }}>
              {this._renderStatRow('Accuracy', `${(stats.accuracy * 100).toFixed(2)}%`)}
              {this._renderStatRow('Playcount', stats.playcount.toLocaleString())}
              {this._renderStatRow('Ranked Score', stats.ranked_score.toLocaleString())}
              {this._renderStatRow('Total Hits', stats.total_hits.toLocaleString())}
              {this._renderStatRow('Replays watched by others', stats.replays_watched.toLocaleString())}
            </div>
          </div>
        </div>
        {this.props.banchoUser ? this._renderOnlineBanchoUser() : this._renderOfflineBanchoUser()}
      </div>
    );
  }

  _renderLoading() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', paddingTop: 30 }}>
        <CircularProgress size={2} />
      </div>
    );
  }

  _renderError() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', paddingTop: 30 }}>
        {this.props.currentUser.errorMessage}
      </div>
    );
  }

  render() {
    const { fetching, user, errorMessage } = this.props.currentUser;

    if (fetching) {
      return this._renderLoading();
    } else if (errorMessage) {
      return this._renderError();
    }

    const [stats] = user.stats;

    return (
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginTop: 20 }}>
        <div style={{ width: 965 }}>
          {this._renderHeader(user, stats)}
          {this._renderScoresTable(stats.scores, true)}
          {this._renderFirstPlaceScoresTable(stats.first_place_scores)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  loggedInUser: state.session.currentUser,
  currentUser: state.currentUser,
  socket: state.session.socket,
  banchoUser: state.bancho.users[Number(props.params.userId)],
});

export default connect(mapStateToProps)(UserShowView);
