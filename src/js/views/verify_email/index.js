import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import Actions from '../../actions/verify_email';
import {
  setDocumentTitle,
} from '../../utils';
import Form from '../../forms/Form';
import VerifyEmailFormSchema from '../../forms/schemas/VerifyEmailFormSchema';

const styles = {
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  resultText: {
    marginBottom: 20,
  },
};

class VerifyEmailView extends React.Component {
  static propTypes = {
    location: PropTypes.shape({
      query: PropTypes.shape({
        t: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    verifyEmail: PropTypes.shape({
      succeeded: PropTypes.bool.isRequired,
      loading: PropTypes.bool.isRequired,
      errors: PropTypes.array,
    }).isRequired,
    loggedInUser: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      validationEnabled: false,
    };
  }

  componentDidMount() {
    setDocumentTitle('Verify Email');
    this.props.dispatch(Actions.verifyEmail(this.props.location.query.t));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedInUser.email_verified) {
      this.props.dispatch(push('/'));
    }
  }

  _handleHomepageClick(e) {
    e.preventDefault();
    this.props.dispatch(push('/'));
  }

  _handleResendClick() {
    this.props.dispatch(Actions.resendVerificationEmail());
  }

  _handleResendSubmit(e) {
    e.preventDefault();

    const { form } = this.refs;

    if (form.validate()) {
      const data = form.getValue();

      this.props.dispatch(Actions.resendVerificationEmail(data.usernameOrEmail));
    }

    this.setState({
      validationEnabled: true,
    });
  }

  _renderFailure() {
    const { loggedInUser, verifyEmail: { resend: { errors, succeeded } } } = this.props;

    let action;
    if (loggedInUser) {
      action = (
        <RaisedButton
          label='Resend verification email'
          primary
          onClick={::this._handleResendClick}
        />
      );
    } else {
      action = (
        <div>
          <form>
            <Form
              ref='form'
              schema={VerifyEmailFormSchema}
              validationEnabled={this.state.validationEnabled}
              errors={errors}
            />
            <RaisedButton
              label={(succeeded ? 'Re-sent' : 'Resend') + ' verification email'}
              type='submit'
              primary
              disabled={succeeded}
              onClick={::this._handleResendSubmit}
            />
          </form>
        </div>
      );
    }

    return (
      <div>
        <div style={styles.resultText}>
          Invalid email verification token.
        </div>

        {action}
      </div>
    );
  }

  _renderSuccess() {
    return (
      <div>
        <div style={styles.resultText}>
          Successfully verified your email.
        </div>

        <RaisedButton
          label='Return to homepage'
          primary
          linkButton
          href='/'
          onClick={::this._handleHomepageClick}
        />
      </div>
    );
  }

  render() {
    const { succeeded, loading } = this.props.verifyEmail;

    if (loading) {
      return (
        <div style={styles.spinnerContainer}>
          <CircularProgress size={2} />
        </div>
      );
    }

    return (
      <div>
        {succeeded ? this._renderSuccess() : this._renderFailure()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  verifyEmail: state.verifyEmail,
  loggedInUser: state.session.currentUser,
});

export default connect(mapStateToProps)(VerifyEmailView);
