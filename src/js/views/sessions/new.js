import { Paper, RaisedButton } from 'material-ui';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Actions from '../../actions/sessions';
import { setDocumentTitle } from '../../utils';

import Form from '../../forms/Form';
import SigninFormSchema from '../../forms/schemas/SigninFormSchema';
import logoImage from '../../../images/logo-transparent.png';

class SessionsNew extends React.Component {
  constructor() {
    super();
    this.state = {
      validationEnabled: false,
    };
  }

  componentDidMount() {
    setDocumentTitle('Sign in');
  }

  _handleClickSubmit(e) {
    e.preventDefault();

    const { form } = this.refs;

    if(form.validate()) {
      const { username, password } = form.getValue();
      const { dispatch } = this.props;

      dispatch(Actions.signIn(username, password));
    }

    this.setState({
      validationEnabled: true,
    });
  }

  _renderError() {
    let { error } = this.props;

    if (!error) return false;
    return (
      <div className='error'>
        { error }
      </div>
    );
  }

  render() {
    return (
      <div id='auth_container'>
        <div className='logo'>
          <img src={logoImage} />
        </div>
        <form id='auth_form'>
          <h2>Sign In</h2>
          { this._renderError() }
          <Form
            ref='form'
            schema={SigninFormSchema}
            validationEnabled={this.state.validationEnabled}
          />
          <RaisedButton
            label='Sign In'
            type='submit'
            primary={true}
            onClick={this._handleClickSubmit.bind(this)}
          />
        </form>
        <Link to='/sign_up'>Create new account</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  state.session
);

export default connect(mapStateToProps)(SessionsNew);
