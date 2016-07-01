import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import OptionalAuthenticatedContainer from './optional_authenticated';

class AuthenticatedContainer extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    currentUser: PropTypes.any,
  }

  render() {
    const {
      currentUser,
    } = this.props;

    if (!currentUser) {
      return false;
    }

    return (
      <OptionalAuthenticatedContainer>
        {this.props.children}
      </OptionalAuthenticatedContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
});

export default connect(mapStateToProps)(AuthenticatedContainer);
