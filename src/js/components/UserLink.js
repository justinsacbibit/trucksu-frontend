import React, { PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';


class UserLink extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    userId: PropTypes.any.isRequired,
    username: PropTypes.node,
    children: PropTypes.node,
  }

  _handleUserClick = (e) => {
    if (e.button == 1) {
      return;
    }
    e.preventDefault();
    this.props.dispatch(push(`/users/${this.props.userId}`));
  }

  render() {
    return (
      <a
        href={`/users/${this.props.userId}`}
        onClick={this._handleUserClick}
        style={{ color: '#0000FF', cursor: 'pointer', textDecoration: 'none' }}
      >
        {this.props.username || this.props.children}
      </a>
    );
  }
}

export default connect(state => state)(UserLink);
