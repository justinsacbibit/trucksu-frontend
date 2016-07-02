import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Paper from 'material-ui/Paper';

import { resendVerificationEmail } from '../actions/verify_email';

const styles = {
  notification: {
    position: 'fixed',
    left: 20,
    bottom: 20,
    padding: 16,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  notificationText: {
    color: 'white',
    fontSize: 14,
  },
  resendText: {
    color: '#90CAF9',
    textDecoration: 'none',
    fontSize: 14,
    outline: 0,
  },
  disabledResendText: {
    cursor: 'default',
  },
};

class UnverifiedEmail extends React.Component {
  static propTypes = {
    errors: PropTypes.array.isRequired,
    succeeded: PropTypes.bool,
    loading: PropTypes.bool.isRequired,
    loggedInUser: PropTypes.shape({
      email: PropTypes.string.isRequired,
    }),

    resendVerificationEmail: PropTypes.func.isRequired,
  }

  _isActionDisabled = () => {
    const { loading, succeeded } = this.props;
    const disableLink = loading || succeeded;
    return disableLink;
  }

  _actionText = () => {
    if (this.props.loading) {
      return 'Sending...';
    } else if (this.props.succeeded !== null) {
      if (this.props.succeeded) {
        return 'Sent! Check your email.';
      } else {
        return 'Failed to send, try again?';
      }
    } else {
      return 'Send verification email';
    }
  }

  _handleResendClick = (e) => {
    e.preventDefault();
    if (this._isActionDisabled()) {
      return;
    }
    this.props.resendVerificationEmail();
  }

  _renderAction = () => {
    const disableLink = this._isActionDisabled();
    const style = {
      ...styles.resendText,
      ...(disableLink ? styles.disabledResendText : {}),
    };
    return (
      <a
        href={disableLink ? null : '#'}
        onClick={this._handleResendClick}
        style={style}
      >
        {this._actionText()}
      </a>
    );
  }

  render = () => {
    const { loggedInUser } = this.props;

    if (!loggedInUser || loggedInUser.email_verified) {
      return null;
    }

    return (
      <Paper
        style={styles.notification}
        zDepth={1}
      >
        <span style={styles.notificationText}>
          Your email ({loggedInUser.email}) is unverified.
        </span>
        &nbsp;
        {this._renderAction()}
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.verifyEmail.resend,
    loggedInUser: state.session.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    resendVerificationEmail,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UnverifiedEmail);

