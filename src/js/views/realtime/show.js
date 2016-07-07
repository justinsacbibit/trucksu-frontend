import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import Divider from 'material-ui/Divider';
import SessionActions from '../../actions/sessions';

import {
  setDocumentTitle,
  avatarUrl,
} from '../../utils';

import UserLink from '../../components/UserLink';
import Flag from '../../components/Flag';


const styles = {
};

class RealtimeShowView extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
  }

  componentDidMount() {
    setDocumentTitle('Realtime');

    this.props.dispatch(SessionActions.connectToSocket());
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
        <div style={{ width: 965 }}>
          <h2 style={{ fontFamily: 'Roboto,sans-serif', borderBottom: '1px solid #eee', paddingBottom: '.3em', fontWeight: 400 }}>Online Users</h2>
          {_.sortBy(_.values(this.props.users), (user) => user.rank).map((user) => {
            let action = 'unknown';
            switch (user.action.action_id) {
            case 0:
              action = 'Active';
              break;
            case 1:
              action = 'AFK';
              break;
            case 2:
              action = `Playing ${user.action.action_text}`;
              break;
            case 5:
              action = `Multiplayer ${user.action.action_text}`;
              break;
            case 6:
              action = `Watching ${user.action.action_text}`;
            default:
              break;
            }

            return (
              <div style={{display: 'flex', flexDirection: 'row'}} key={user.id}>
                <div style={{width: 400}}>
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
});

export default connect(mapStateToProps)(RealtimeShowView);

