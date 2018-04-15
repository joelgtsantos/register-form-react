import PropTypes from 'prop-types';
import React from 'react';

class Field extends React.Component {
  //Using proptypes to validate the props that are passing through the props from component-form
  static propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    validate: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
  };

  state = {
    value: this.props.value,
    error: false,
  };

  //Set clear the field
  componentWillReceiveProps(update) {
    this.setState({ value: update.value });
  }

  onChange = (evt) => {
    const name = this.props.name;
    
    //Get the value
    const value = evt.target.value;

    //Wheather or not the field has a validate function
    const error = this.props.validate ? this.props.validate(value) : false;

    //Update state
    this.setState({ value, error });

    //Propagate up
    this.props.onChange({ name, value, error });
  };

  render() {
    return (
      <div>
        <input
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={this.onChange}
          type={this.props.type ? this.props.type : ''}
        />
        <span style={{ color: 'red' }}>{ this.state.error }</span>
      </div>
    );
  }
};

export default Field;