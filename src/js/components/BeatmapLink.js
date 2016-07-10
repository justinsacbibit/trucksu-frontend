import React, { PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';


class BeatmapLink extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    beatmapId: PropTypes.any.isRequired,
    children: PropTypes.node,
    style: PropTypes.any,
  }
  static defaultProps = {
    style: {},
  }

  _handleClick = (e) => {
    if (e.button == 1) {
      return;
    }
    e.preventDefault();
    this.props.dispatch(push(`/beatmaps/${this.props.beatmapId}`));
  }

  render() {
    return (
      <a
        href={`/beatmaps/${this.props.beatmapId}`}
        onClick={this._handleClick}
        style={{ color: '#0000FF', cursor: 'pointer', textDecoration: 'none', ...this.props.style }}
      >
        {this.props.children}
      </a>
    );
  }
}

export default connect(() => ({}))(BeatmapLink);
