import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import Divider from 'material-ui/Divider';
import Actions from '../../actions/realtime';

import {
  setDocumentTitle,
  avatarUrl,
} from '../../utils';
import {
  getModsArray,
  getActionText,
} from '../../utils/osu';

import UserLink from '../../components/UserLink';
import Flag from '../../components/Flag';


const styles = {
};

class RealtimeShowView extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
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
    return (
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
        <div style={{ width: 965 }}>
          <h2 style={{ fontFamily: 'Roboto,sans-serif', borderBottom: '1px solid #eee', paddingBottom: '.3em', fontWeight: 400 }}>Multiplayer Matches</h2>
          {_.values(this.props.matches).map((match) => {
            return (
              <div style={{ display: 'flex', flexDirection: 'row' }} key={match.match_id}>
                <div style={{ width: 400 }}>
                  {match.match_name}
                </div>
                <div>
                </div>
              </div>
            );
          })}
          <h2 style={{ fontFamily: 'Roboto,sans-serif', borderBottom: '1px solid #eee', paddingBottom: '.3em', fontWeight: 400 }}>Online Users</h2>
          {_.sortBy(_.values(this.props.users), (user) => user.rank).map((user) => {
            const action = getActionText(user.action);

            return (
              <div style={{ display: 'flex', flexDirection: 'row' }} key={user.id}>
                <div style={{ width: 400 }}>
                  <UserLink
                    userId={user.id}
                    username={user.username}
                  />
                  &nbsp;(#{user.rank})
                </div>
                <div>
                  Current status: {action}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.bancho.users,
  matches: state.bancho.matches,
  socket: state.session.socket,
});

export default connect(mapStateToProps)(RealtimeShowView);

