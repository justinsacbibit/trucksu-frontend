import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { RaisedButton } from 'material-ui';

import Actions from '../../actions/registrations';
import { setDocumentTitle } from '../../utils';

import Form from '../../forms/Form';
import SignupFormSchema from '../../forms/schemas/SignupFormSchema';
// import logoImage from '../../../images/logo-transparent.png';

class RegistrationsNew extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    errors: PropTypes.array,
  }

  constructor() {
    super();
    this.state = {
      validationEnabled: false,
    };
  }

  componentDidMount() {
    setDocumentTitle('Sign up');
  }

  _handleClickSubmit(e) {
    e.preventDefault();

    const { form } = this.refs;

    if (form.validate()) {
      const { dispatch } = this.props;
      const data = form.getValue();

      dispatch(Actions.signUp(data));
    }

    this.setState({
      validationEnabled: true,
    });
  }

  render() {
    const errors = this.props.errors || [];

    return (
      <div id='auth_container'>
        {/*
        <div className='logo'>
          <img src={logoImage} />
        </div>
        */}
        <form id='auth_form'>
          <h2>Sign Up</h2>
          <Form
            ref='form'
            schema={SignupFormSchema}
            validationEnabled={this.state.validationEnabled}
            errors={errors}
          />
          <RaisedButton
            label='Sign Up'
            type='submit'
            primary
            onClick={this._handleClickSubmit.bind(this)}
          />
        </form>
        <Link to='/sign-in'>Sign in</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.registration.errors,
});

export default connect(mapStateToProps)(RegistrationsNew);
