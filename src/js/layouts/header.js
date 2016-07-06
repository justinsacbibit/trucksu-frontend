import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import CircularProgress from 'material-ui/CircularProgress';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';

import SessionActions from '../actions/sessions';

import UserLink from '../components/UserLink';
import HeaderButton from '../components/HeaderButton';

const styles = {
  right: {
    display: 'flex',
  },
};

class Header extends React.Component {
  static propTypes = {
    currentUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
    }),
    loadingUser: PropTypes.bool,

    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),

    dispatch: PropTypes.func.isRequired,
  }

  _handleSignOutClick(e) {
    e.preventDefault();

    this.props.dispatch(SessionActions.signOut());
  }

  _handleSignInClick(e) {
    e.preventDefault();

    this.props.dispatch(push('/sign-in'));
  }

  _renderCurrentUser() {
    const { currentUser } = this.props;

    return (
      <div style={{ alignSelf: 'center' }}>
        <UserLink
          userId={currentUser.id}
          username={currentUser.username}
        />
      </div>
    );
  }

  _renderSignOutLink() {
    return (
      <HeaderButton
        label='Sign out'
        onPress={::this._handleSignOutClick}
      />
    );
  }

  _renderSignInRegister() {
    return (
      <div style={styles.right}>
        <HeaderButton
          label='Sign in or register'
          onPress={::this._handleSignInClick}
        />
      </div>
    );
  }

  _renderRight() {
    if (this.props.loadingUser) {
      return (
        <CircularProgress
          color='white'
          size={0.5}
        />
      );
    }

    if (this.props.currentUser) {
      return (
        <div style={styles.right}>
          {this._renderCurrentUser()}
          {this._renderSignOutLink()}
        </div>
      );
    }

    return this._renderSignInRegister();
  }

  render() {
    let tabsValue = -1;
    if (this.props.location) {
      switch (this.props.location.pathname) {
      case '/':
        tabsValue = 0;
        break;
      case '/realtime':
        tabsValue = 1;
        break;
      default:
        break;
      }
    }
    return (
      <AppBar
        showMenuIconButton={false}
        title='Trucksu'
        titleStyle={{ marginRight: 24, flex: 'none' }}>
        <Tabs
          onChange={(value) => {
            switch (value) {
            case 0:
              this.props.dispatch(push('/'));
              break;
            case 1:
              this.props.dispatch(push('/realtime'));
              break;
            default:
              break;
            }
          }}
          style={{ flex: 'none', height: 64 }}
          value={tabsValue}>
          {/* <Tab
            label='Home'
            style={{height: 64}}
            value={0} />*/}
          <Tab
            label='Leaderboard'
            style={{ height: 64, width: 140 }}
            value={0}
          />
          {/*
          <Tab
            label='Realtime'
            style={{ height: 64, width: 140 }}
            value={1}
          />
          */}
        </Tabs>
        <div style={{ flex: 1 }} />
        {this._renderRight()}
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  loadingUser: state.session.loading,
  //socket: state.session.socket,
  //boards: state.boards,
  //currentBoard: state.currentBoard,
  //header: state.header,
});

export default connect(mapStateToProps)(Header);
