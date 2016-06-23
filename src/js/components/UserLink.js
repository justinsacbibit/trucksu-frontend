import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';


class UserLink extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    userId: PropTypes.any.isRequired,
    username: PropTypes.string.isRequired,
  }

  _handleUserClick = (e) => {
    e.preventDefault();
    this.props.dispatch(push(`/users/${this.props.userId}`));
  }

  render() {
    return (
      <a
        href={`/users/${this.props.userId}`}
        onClick={this._handleUserClick}
        style={{color: '#0000FF', cursor: 'pointer', textDecoration: 'none'}}
      >
        {this.props.username}
      </a>
    );
  }
}

export default connect(state => state)(UserLink);

