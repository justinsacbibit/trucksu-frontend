import React from 'react';
import { connect } from 'react-redux';
import OptionalAuthenticatedContainer from './optional_authenticated';

class AuthenticatedContainer extends React.Component {
  render() {
    const {
      currentUser,
    } = this.props;

    if (!currentUser) return false;

    return (
      <OptionalAuthenticatedContainer>
        {this.props.children}
      </OptionalAuthenticatedContainer>
    );
  }
}

const mapStateToProps = (state, props) => ({
  currentUser: state.session.currentUser,
});

export default connect(mapStateToProps)(AuthenticatedContainer);
