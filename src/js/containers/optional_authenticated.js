import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import SessionActions from '../actions/sessions';
import Header from '../layouts/header';
import UnverifiedEmail from '../components/UnverifiedEmail';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  innerContainer: {
    width: 965,
  },
};

class OptionalAuthenticatedContainer extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.any,
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch(BoardsActions.fetchBoards());
  }

  _handleSignOutClick(e) {
    e.preventDefault();

    this.props.dispatch(SessionActions.signOut());
  }

  _handleRequestClose() {
    this.setState({

    });
  }

  render() {
    return (
      <div className='application-container'>
        <Header location={this.props.location} />

        <div className='main-container' style={styles.container}>
          <div style={styles.innerContainer}>
            {this.props.children}
          </div>
        </div>

        <UnverifiedEmail />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  currentUser: state.session.currentUser,
  location: props.location,
});

export default connect(mapStateToProps)(OptionalAuthenticatedContainer);
