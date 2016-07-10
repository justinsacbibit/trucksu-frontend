import React, { PropTypes } from 'react';


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
    if (!this.props.href.startsWith('/') || e.button == 1) {
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
        style={{ color: '#0000FF', cursor: 'pointer', textDecoration: 'none', ...this.props.style }}
      >
        {this.props.children}
      </a>
    );
  }
}
