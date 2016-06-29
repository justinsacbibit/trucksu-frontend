import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  buttonLabel: {
    color: '#fff',
  },
  button: {
    margin: 12,
  },
};

export default class HeaderButton extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  }

  render() {
    return (
      <FlatButton
        label={this.props.label}
        labelStyle={styles.buttonLabel}
        style={styles.button}
        onMouseUp={this.props.onPress}
      />
    );
  }
}

