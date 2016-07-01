import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import Actions from '../../actions/current_beatmap';
import Constants from '../../constants';
import {
  setDocumentTitle,
  apiUrl,
} from '../../utils';
import { getModsArray } from '../../utils/osu';

import UserLink from '../../components/UserLink';


const styles = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 30,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  widthContainer: {
    width: 965,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderBottom: '1px solid #eee',
    width: '100%',
    marginBottom: 20,
    paddingBottom: 10,
  },
  artistTitleText: {
    borderBottom: 'none', // ugly workaround
    marginBottom: 0,
  },
};

class BeatmapShowView extends React.Component {
  static propTypes = {
    beatmap: PropTypes.shape({
    }).isRequired,
    loggedInUser: PropTypes.object,
    params: PropTypes.shape({
      beatmapId: PropTypes.string.isRequired,
    }).isRequired,

    // actions
    fetchBeatmapset: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchBeatmapset(this.props.params.beatmapId);
  }

  componentWillUnmount() {
    this.props.resetBeatmapset();
  }

  componentDidUpdate(prevProps) {
    if (this.props.beatmap.beatmapset) {
      const matchingBeatmap = this.props.beatmap.beatmapset.beatmaps.find(beatmap => beatmap.id === Number(this.props.params.beatmapId));
      if (!matchingBeatmap) {
        this.props.fetchBeatmapset(this.props.params.beatmapId);
      }
    }
  }

  _handleBeatmapClick(beatmapId, e) {
    e.preventDefault();
    this.props.push(`/beatmaps/${beatmapId}`);
  }

  _renderDownloadSection(beatmapset, beatmap) {
    if (!this.props.loggedInUser) {
      return null;
    }

    return (
      <div style={styles.headerContainer}>
        <div>
          <RaisedButton
            label='Download'
            style={{ margin: 5 }}
            linkButton
            href={apiUrl(`/v1/beatmapsets/${beatmapset.id}/download`)}
          />
          <RaisedButton
            label='osu!direct'
            style={{ margin: 5 }}
            linkButton
            href={`osu://b/${beatmap.id}`}
          />
        </div>
      </div>
    );
  }

  render() {
    const { fetching, beatmapset } = this.props.beatmap;

    if (fetching) {
      return (
        <div style={styles.loadingContainer}>
          <CircularProgress size={2} />
        </div>
      );
    }

    const beatmap = beatmapset.beatmaps.find((beatmap) => beatmap.id === Number(this.props.params.beatmapId));

    return (
      <div style={styles.container}>
        <div style={styles.widthContainer}>
          <div style={styles.headerContainer}>
            <h2 style={styles.artistTitleText}>
              {beatmapset.artist} - {beatmapset.title}
            </h2>

            Mapped by {beatmapset.creator}

            <div>
              {beatmapset.beatmaps.map((beatmap, index) => {
                const isSelected = beatmap.id === Number(this.props.params.beatmapId);
                return (
                  <RaisedButton
                    key={index}
                    label={beatmap.version}
                    style={{ margin: 5 }}
                    primary={isSelected}
                    secondary={!isSelected}
                    linkButton
                    href={`/beatmaps/${beatmap.id}`}
                    onClick={this._handleBeatmapClick.bind(this, beatmap.id)}
                  />
                );
              })}
            </div>
          </div>

          {this._renderDownloadSection(beatmapset, beatmap)}

          <div>
            <Table>
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>Rank</TableHeaderColumn>
                  <TableHeaderColumn>Username</TableHeaderColumn>
                  <TableHeaderColumn>Score</TableHeaderColumn>
                  <TableHeaderColumn>Mods</TableHeaderColumn>
                  <TableHeaderColumn>PP</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}>
                {beatmap.scores.map((score, index) => {
                  return (
                    <TableRow key={index}>
                      <TableRowColumn>{index + 1}</TableRowColumn>
                      <TableRowColumn>
                        <UserLink
                          userId={score.user.id}
                          username={score.user.username}
                        />
                      </TableRowColumn>
                      <TableRowColumn>{score.score.toLocaleString()}</TableRowColumn>
                      <TableRowColumn>{getModsArray(score.mods).join(',')}</TableRowColumn>
                      <TableRowColumn>{score.pp ? score.pp.toFixed(2) : 'N/A'}</TableRowColumn>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  beatmap: state.currentBeatmap,
  loggedInUser: state.session.currentUser,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchBeatmapset: Actions.fetchBeatmapset,
    resetBeatmapset: Actions.resetBeatmapset,
    push,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BeatmapShowView);

