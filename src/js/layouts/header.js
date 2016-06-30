import React            from 'react';
import { connect }      from 'react-redux';
import { Link }         from 'react-router';
import ReactGravatar    from 'react-gravatar';
import { push }         from 'react-router-redux';

import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import SessionActions from '../actions/sessions';
import HeaderActions from '../actions/header';

import UserLink from '../components/UserLink';
import HeaderButton from '../components/HeaderButton';

const styles = {
  right: {
    display: 'flex',
  },
};

class Header extends React.Component {
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
      <div style={{alignSelf: 'center'}}>
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
    const tabsValue = this.props.location && this.props.location.pathname === '/'
      ? 0
      : -1;
    return (
      <AppBar
        showMenuIconButton={false}
        title='Trucksu'
        titleStyle={{marginRight: 24, flex: 'none'}}>
        <Tabs
          onChange={(value) => {
            if (value === 0) {
              this.props.dispatch(push('/'));
            }
          }}
          style={{flex: 'none', height: 64}}
          value={tabsValue}>
          {/*<Tab
            label='Home'
            style={{height: 64}}
            value={0} />*/}
          <Tab
            label='Leaderboard'
            style={{height: 64, width: 140}}
            value={0} />
        </Tabs>
        <div style={{flex: 1}} />
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
