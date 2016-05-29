import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import classnames from 'classnames';

import { setDocumentTitle } from '../../utils';
import Actions from '../../actions/boards';
import LeaderboardActions from '../../actions/leaderboard';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';

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

  _handleUserClick(userId, e) {
    e.preventDefault();
    this.props.dispatch(push(`/users/${userId}`));
  }

  _renderTable() {
    return (
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn width={90}>Rank</TableHeaderColumn>
            <TableHeaderColumn width={160}>Username</TableHeaderColumn>
            <TableHeaderColumn>PP</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.props.leaderboard.map((user, index) => {
            return (
              <TableRow key={index} selectable={false}>
                <TableRowColumn width={90}>#{index + 1}</TableRowColumn>
                <TableRowColumn width={160}><a href={`/users/${user.user.id}`} onClick={this._handleUserClick.bind(this, user.user.id)} style={{color: '#0000FF', cursor: 'pointer', textDecoration: 'none'}}>{user.user.username}</a></TableRowColumn>
                <TableRowColumn><strong>{user.pp.toFixed(2)}pp</strong></TableRowColumn>
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
