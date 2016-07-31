import React, { PropTypes } from 'react';
import Radium from 'radium';


const styles = {
  anchor: {
    color: '#333',
    cursor: 'pointer',
    textDecoration: 'none',
    ':hover': {
      color: '#4078c0',
    },
  },
};

@Radium
export default class Link extends React.Component {
  static propTypes = {
    href: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
    style: PropTypes.any,
  }
  static defaultProps = {
    style: {},
  }

  _handleClick = (e) => {
    if (!this.props.href.startsWith('/') || e.button === 1) {
      return;
    }
    e.preventDefault();
    this.props.onClick(e);
  }

  render() {
    return (
      <a
        href={this.props.href}
        onClick={this._handleClick}
        style={[styles.anchor, this.props.style]}
      >
        {this.props.children}
      </a>
    );
  }
}
