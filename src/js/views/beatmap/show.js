import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';


import Actions from '../../actions/current_beatmap';
import Constants from '../../constants';
import { setDocumentTitle } from '../../utils';

import { getModsArray } from '../../utils/osu';


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
    params: PropTypes.shape({
      beatmapId: PropTypes.string.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    this.props.dispatch(Actions.fetchBeatmapset(this.props.params.beatmapId));
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

    console.log(beatmapset);

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
                return (
                  <RaisedButton
                    key={index}
                    label={beatmap.version}
                    style={{margin: 5}}
                    secondary
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  beatmap: state.currentBeatmap,
});

export default connect(mapStateToProps)(BeatmapShowView);

