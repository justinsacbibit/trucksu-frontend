import React, { PropTypes } from 'react';

import Link from './Link';

export default class JoinMatchLink extends React.Component {
  static propTypes = {
    matchId: PropTypes.number,
    children: PropTypes.node,
  }

  render() {
    return (
      <Link
        href={`osu://mp/${this.props.matchId}/`}
      >
        {this.props.children}
      </Link>
    );
  }
}
