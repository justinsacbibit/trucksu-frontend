import React, { PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import Link from './Link';


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

  _url() {
    return `/b/${this.props.beatmapId}`;
  }

  _handleClick = (e) => {
    this.props.dispatch(push(this._url()));
  }

  render() {
    return (
      <Link
        href={this._url()}
        onClick={this._handleClick}
      >
        {this.props.children}
      </Link>
    );
  }
}

export default connect(() => ({}))(BeatmapLink);
