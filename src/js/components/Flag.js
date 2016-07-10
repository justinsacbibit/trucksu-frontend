import React, { PropTypes } from 'react';


export default class Flag extends React.Component {
  static propTypes = {
    country: PropTypes.string,
    style: PropTypes.any,
  };
  static defaultProps = {
    country: 'BL',
    style: {},
  };

  render() {
    const { country } = this.props;
    return (
      <img
        src={require(`../../../img/flags/flags-iso/flat/32/${country || 'BL'}.png`)}
        title={country}
        style={this.props.style}
      />
    );
  }
}
