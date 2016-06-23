import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';

import { setDocumentTitle } from '../../utils';
import Actions from '../../actions/boards';
import LeaderboardActions from '../../actions/leaderboard';
import UserLink from '../../components/UserLink';

class HomeIndexView extends React.Component {
  static propTypes = {
    fetching: PropTypes.bool.isRequired,
    leaderboard: PropTypes.array,
  };

  componentDidMount() {
    setDocumentTitle('Leaderboard');

    const { dispatch } = this.props;
    dispatch(LeaderboardActions.fetchLeaderboard());
  }

  _renderTable() {
    return (
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn width={90}>Rank</TableHeaderColumn>
            <TableHeaderColumn width={160}>Username</TableHeaderColumn>
            <TableHeaderColumn width={130}>PP</TableHeaderColumn>
            <TableHeaderColumn width={120}>Accuracy</TableHeaderColumn>
            <TableHeaderColumn width={120}>Playcount</TableHeaderColumn>
            <TableHeaderColumn>Country</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.props.leaderboard.map((user, index) => {
            return (
              <TableRow key={index} selectable={false}>
                <TableRowColumn width={90}>
                  #{index + 1}
                </TableRowColumn>

                <TableRowColumn width={160}>
                  <UserLink
                    userId={user.user.id}
                    username={user.user.username}
                  />
                </TableRowColumn>

                <TableRowColumn width={130}>
                  <strong>{user.pp.toFixed(2)}pp</strong>
                </TableRowColumn>

                <TableRowColumn width={120}>
                  {(user.accuracy * 100).toFixed(2)}%
                </TableRowColumn>

                <TableRowColumn width={120}>
                  {user.playcount.toLocaleString()}
                </TableRowColumn>

                <TableRowColumn>
                  {user.user.country || 'Unknown'}
                </TableRowColumn>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }

  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
        <div style={{width: 965}}>
          <h2 style={{fontFamily: 'Roboto,sans-serif', borderBottom: '1px solid #eee', paddingBottom: '.3em', fontWeight: 400}}>Global Performance Leaderboard</h2>
          <Paper style={{width: '100%', justifyContent: 'center', display: 'flex'}} zDepth={1}>
            {this.props.fetching ? <CircularProgress size={2} /> : this._renderTable()}
          </Paper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  state.leaderboard
);

export default connect(mapStateToProps)(HomeIndexView);
