import React, { PropTypes } from 'react';

class FieldContainer extends React.Component {
  static propTypes = {
    field: PropTypes.func,
    fieldProps: PropTypes.object,
  }

  render() {
    const { field, fieldProps } = this.props;

    return (
      <div className='field'>
        { React.createElement(field, fieldProps) }
      </div>
    );
  }
}

export default FieldContainer;
