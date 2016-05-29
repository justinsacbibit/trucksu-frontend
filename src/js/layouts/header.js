import React            from 'react';
import { connect }      from 'react-redux';
import { Link }         from 'react-router';
import ReactGravatar    from 'react-gravatar';
import { push }         from 'react-router-redux';

import SessionActions   from '../actions/sessions';
import HeaderActions    from '../actions/header';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class Header extends React.Component {
  _handleBoardsClick(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    const { ownedBoards, invitedBoards } = this.props.boards;

    if (ownedBoards.length != 0 || invitedBoards.length != 0) {
      dispatch(HeaderActions.showBoards(true));
    } else {
      dispatch(push('/'));
    }
  }

  _hideBoards() {
    const { dispatch } = this.props;
    dispatch(HeaderActions.showBoards(false));
  }

  _createBoardItem(dispatch, currentBoard, socket, board) {
    const onClick = (e) => {
      e.preventDefault();

      if (currentBoard.id != undefined && currentBoard.id == board.id) {
        dispatch(HeaderActions.showBoards(false));
        return false;
      }

      dispatch(HeaderActions.visitBoard(socket, currentBoard.channel, board.id));
    };

    return (
      <li key={board.id}>
        <a href='#' onClick={onClick}>{board.name}</a>
      </li>
    );
  }

  _renderCurrentUser() {
    const { currentUser } = this.props;

    if (!currentUser) {
      return false;
    }

    return (
      <div style={{alignSelf: 'center'}}>{currentUser.username}</div>
    );
  }

  _renderSignOutLink() {
    if (!this.props.currentUser) {
      return false;
    }

    return (
      <FlatButton
        label='Sign out'
        labelStyle={{color: '#fff'}}
        style={{margin: 12, marginRight: 0}}
        onMouseUp={::this._handleSignOutClick} />
    );
  }

  _handleSignOutClick(e) {
    e.preventDefault();

    this.props.dispatch(SessionActions.signOut());
  }

  render() {
    const tabsValue = this.props.location.pathname.startsWith('/users/')
      ? -1
      : 0;
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
        <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
          {this._renderSignOutLink()}
          {this._renderCurrentUser()}
        </div>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  //socket: state.session.socket,
  //boards: state.boards,
  //currentBoard: state.currentBoard,
  //header: state.header,
});

export default connect(mapStateToProps)(Header);
