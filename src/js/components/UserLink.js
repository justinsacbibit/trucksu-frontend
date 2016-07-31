import React, { PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import Link from './Link';


class UserLink extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    userId: PropTypes.any.isRequired,
    username: PropTypes.node,
    children: PropTypes.node,
    style: PropTypes.any,
  }

  _url() {
    return `/u/${this.props.userId}`;
  }

  _handleUserClick = (e) => {
    this.props.dispatch(push(this._url()));
  }

  render() {
    return (
      <Link
        href={this._url()}
        onClick={this._handleUserClick}
        style={this.props.style}
      >
        {this.props.username || this.props.children}
      </Link>
    );
  }
}

export default connect(state => state)(UserLink);
