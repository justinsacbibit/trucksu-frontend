import React, { PropTypes } from 'react';


export default class Flag extends React.Component {
  static propTypes = {
    country: PropTypes.string,
  };
  static defaultProps = {
    country: 'BL',
  };

  render() {
    const { country } = this.props;
    return (
      <img
        src={require(`../../../img/flags/flags-iso/flat/32/${country}.png`)}
        title={country}
      />
    );
  }
}

