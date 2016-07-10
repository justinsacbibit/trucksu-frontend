import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import Divider from 'material-ui/Divider';

import Actions from '../../actions/realtime';
import RealtimeView from './view';
import LoadingSpinner from '../../components/LoadingSpinner';

import {
  setDocumentTitle,
} from '../../utils';

class RealtimeShowView extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
    matches: PropTypes.object.isRequired,
    socket: PropTypes.any,
  }

  componentDidMount() {
    setDocumentTitle('Realtime');

    if (this.props.socket) {
      this._joinChannels(this.props.socket);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.socket && !this.props.socket) {
      this._joinChannels(nextProps.socket);
    }
  }

  componentWillUnmount() {
    this.props.dispatch(Actions.leaveUsersChannel());
  }

  _joinChannels(socket) {
    this.props.dispatch(Actions.joinUsersChannel(socket));
    this.props.dispatch(Actions.joinMatchesChannel(socket));
  }

  render() {
    // TODO: Error state
    if (!this.props.usersChannel || !this.props.matchesChannel) {
      return <LoadingSpinner />;
    }
    return (
      <RealtimeView
        users={this.props.users}
        matches={this.props.matches}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.bancho.users,
  matches: state.bancho.matches,
  socket: state.session.socket,
  usersChannel: state.session.usersChannel,
  matchesChannel: state.session.matchesChannel,
});

export default connect(mapStateToProps)(RealtimeShowView);
