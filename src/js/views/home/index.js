import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import ErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import {blue500} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';

import {
  setDocumentTitle,
  avatarUrl,
} from '../../utils';
import LeaderboardActions from '../../actions/leaderboard';

import UserLink from '../../components/UserLink';
import Flag from '../../components/Flag';


const styles = {
  avatarColumn: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  error: {
    display: 'flex',
    alignItems: 'center',
  },
  errorOutline: {
    marginRight: 6,
  },
};

class HomeIndexView extends React.Component {
  static propTypes = {
    fetching: PropTypes.bool.isRequired,
    leaderboard: PropTypes.array,
    error: PropTypes.object,

    // handlers
    fetchLeaderboard: PropTypes.func.isRequired,
  }

  componentDidMount() {
    setDocumentTitle('Leaderboard');

    this.props.fetchLeaderboard();
  }

  handlePressRetry = () => {
    this.props.fetchLeaderboard();
  };

  _renderTable() {
    return (
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn width={90}>Rank</TableHeaderColumn>
            <TableHeaderColumn width={40} style={styles.avatarColumn} />
            <TableHeaderColumn width={230}>Username</TableHeaderColumn>
            <TableHeaderColumn width={130}>PP</TableHeaderColumn>
            <TableHeaderColumn width={120}>Accuracy</TableHeaderColumn>
            <TableHeaderColumn width={120}>Playcount</TableHeaderColumn>
            <TableHeaderColumn>Country</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.props.leaderboard.map((user, index) => {
            const country = user.user.country || 'BL';
            return (
              <TableRow key={index} selectable={false}>
                <TableRowColumn width={90}>
                  #{index + 1}
                </TableRowColumn>

                <TableRowColumn width={40} style={styles.avatarColumn}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      size={40}
                      src={avatarUrl(`/${user.user.id}`)}
                      style={{ borderRadius: 0 }}
                    />
                  </div>
                </TableRowColumn>

                <TableRowColumn width={230}>
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
                  <Flag country={country} />
                </TableRowColumn>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }

  renderContent() {
    if (this.props.fetching) {
      return (
        <CircularProgress size={2} />
      );
    }

    if (this.props.error) {
      console.log(this.props.error);
      return (
        <div style={styles.error}>
          <ErrorOutline color={blue500} style={styles.errorOutline} />
          Something went wrong getting the leaderboard..
          <RaisedButton
            label='Retry'
            style={{ marginLeft: 12 }}
            primary
            onClick={this.handlePressRetry}
          />
        </div>
      );
    }

    return (
      <Paper zDepth={1}>
        {this._renderTable()}
      </Paper>
    );
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
        <div style={{ width: 965 }}>
          <h2 style={{ fontFamily: 'Roboto,sans-serif', borderBottom: '1px solid #eee', paddingBottom: '.3em', fontWeight: 400 }}>Global Performance Leaderboard</h2>
          <div style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
            {this.renderContent()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state.leaderboard;

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...LeaderboardActions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeIndexView);
