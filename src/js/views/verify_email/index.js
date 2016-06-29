import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import CircularProgress from 'material-ui/CircularProgress';

import Actions from '../../actions/verify_email';
import {
  setDocumentTitle,
} from '../../utils';

const styles = {
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
};

class VerifyEmailView extends React.Component {
  static propTypes = {
    location: PropTypes.shape({
      query: PropTypes.shape({
        t: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  componentDidMount() {
    setDocumentTitle('Verify Email');
    this.props.dispatch(Actions.verifyEmail(this.props.location.query.t));
  }

  _renderFinished() {
    const { succeeded, loading } = this.props.verifyEmail;

    if (succeeded) {
      return (
        <p>Success</p>
      );
    }

    return (
      <p>Failure</p>
    );
  }

  render() {
    const { loading } = this.props.verifyEmail;

    if (loading) {
      return (
        <div style={styles.spinnerContainer}>
          <CircularProgress size={2} />
        </div>
      );
    }

    return (
      <div>
        {this._renderFinished()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  verifyEmail: state.verifyEmail,
});

export default connect(mapStateToProps)(VerifyEmailView);
