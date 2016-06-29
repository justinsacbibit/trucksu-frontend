import React            from 'react';
import { connect }      from 'react-redux';
import Header           from '../layouts/header';
import SessionActions   from '../actions/sessions';


const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
  },
  innerContainer: {
    width: 965,
  },
};

class OptionalAuthenticatedContainer extends React.Component {
  componentDidMount() {
    //const { dispatch } = this.props;
    //dispatch(BoardsActions.fetchBoards());
  }

  _handleSignOutClick(e) {
    e.preventDefault();

    this.props.dispatch(SessionActions.signOut());
  }

  render() {
    const {
      currentUser,
      dispatch,
      boards,
      socket,
      currentBoard,
    } = this.props;

    return (
      <div className='application-container'>
        <Header location={this.props.location} />

        <div className='main-container' style={styles.container}>
          <div style={styles.innerContainer}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  currentUser: state.session.currentUser,
  location: props.location,
});

export default connect(mapStateToProps)(OptionalAuthenticatedContainer );

