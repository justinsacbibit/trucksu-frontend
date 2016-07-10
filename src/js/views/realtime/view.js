import React, { PropTypes } from 'react';

import Avatar from 'material-ui/Avatar';

import UserLink from '../../components/UserLink';
import BeatmapLink from '../../components/BeatmapLink';

import {
  getModsArray,
  getActionText,
  getGameModeText,
} from '../../utils/osu';
import {
  avatarUrl,
} from '../../utils';

const styles = {
  container: {
     display: 'flex',
     justifyContent: 'center',
     flexDirection: 'row',
  },
  innerContainer: {
    width: 965,
  },
  sectionHeader: {
    borderBottom: '1px solid #eee',
    paddingBottom: '.3em',
    fontWeight: 400,
  },
};

export default class RealtimeView extends React.Component {
  static propTypes = {
    matches: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.innerContainer}>
          <h2 style={styles.sectionHeader}>Multiplayer Matches</h2>
          {_.values(this.props.matches).map((match, index) => {
            const users = match.slots.filter(slot => slot.user_id !== -1);
            const totalSlotCount = match.slots.filter(slot => slot.status !== 2).length;
            const sortedUsers = users.map(user => user.user_id).filter(userId => this.props.users[userId]).map(userId => this.props.users[userId])
            sortedUsers.sort((a, b) => a.rank - b.rank);
            const bestRank = sortedUsers.length ? sortedUsers[0].rank : '?';
            const worstRank = sortedUsers.length ? sortedUsers[sortedUsers.length - 1].rank : '?';
            const rankStr = bestRank !== worstRank ? `${bestRank} - ${worstRank}` : `${bestRank}`;

            const containerStyle = { display: 'flex', flexDirection: 'row' };
            if (index !== 0) {
              containerStyle.marginTop = 12;
            }
            return (
              <div style={containerStyle}>
                <div>
                  <div>
                    {getGameModeText(match.game_mode)} (Head To Head)
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div>
                      {users.length} / {totalSlotCount}
                    </div>
                    <div style={{ marginLeft: 12 }}>
                      rank: {rankStr}
                    </div>
                  </div>
                </div>
                <div style={{ flex: 1 }} />
                <div>
                  <UserLink userId={match.host_user_id}>
                    <Avatar
                      size={74}
                      src={avatarUrl(`/${match.host_user_id}`)}
                      style={{ borderRadius: 0 }}
                    />
                  </UserLink>
                </div>
                <div style={{ marginLeft: 12, width: 540 }}>
                  <div>
                    {match.match_name}
                  </div>
                  <div style={{ marginTop: 2, marginBottom: 2 }}>
                    {match.beatmap_name ?
                      <BeatmapLink
                        beatmapId={match.beatmap_id}
                        style={{ textOverflow: 'ellipsis', display: 'block', overflow: 'hidden', whiteSpace: 'nowrap' }}
                      >
                        {match.beatmap_name}
                      </BeatmapLink>
                    : 'Changing beatmap...'}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {match.slots.filter(slot => slot.user_id !== match.host_user_id).map((slot) => {
                      return (
                        <div key={slot.slot_id} style={{ marginRight: 6 }}>
                          {slot.user_id !== -1 ?
                            <UserLink userId={slot.user_id}>
                              <Avatar
                                size={32}
                                src={avatarUrl(`/${slot.user_id}`)}
                                style={{ backgroundColor: 'white', boxSizing: 'border-box', borderRadius: 0 }}
                              />
                            </UserLink>
                            :
                              <Avatar
                                size={30}
                                src={null}
                                style={{ backgroundColor: 'white', border: '1px solid black', boxSizing: 'border-box', borderRadius: 0 }}
                              />
                          }
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
          <h2 style={styles.sectionHeader}>Online Users</h2>
          {_.sortBy(_.values(this.props.users).filter(user => user), (user) => user.rank).map((user, index) => {
            const action = getActionText(user.action);

            const containerStyle = {
              display: 'flex',
              flexDirection: 'row',
              height: 36,
            };
            if (index !== 0) {
              containerStyle.marginTop = 4;
            }

            return (
              <div style={containerStyle} key={user.id}>
                <div>
                  <UserLink
                    userId={user.id}
                    username={user.username}
                  />
                  &nbsp;(#{user.rank})
                </div>
                <div style={{ flex: 1 }} />
                <div style={{ width: 624 }}>
                  {action}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
