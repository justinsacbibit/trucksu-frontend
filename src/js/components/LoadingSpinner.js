import React, { PropTypes } from 'react';

import CircularProgress from 'material-ui/CircularProgress';


const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
};

export default class LoadingSpinner extends React.Component {
  static propTypes = {
    style: PropTypes.any,
  }
  static defaultProps = {
    style: {},
  }

  render() {
    return (
      <div style={{ ...styles.container, ...this.props.style }}>
        <CircularProgress size={2} />
      </div>
    );
  }
}
