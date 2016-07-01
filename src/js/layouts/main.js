import React, { PropTypes } from 'react';

export default class MainLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
