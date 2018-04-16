import React from 'react';
import PropTypes from 'prop-types';

import isEmail from 'validator/lib/isEmail'; //Only the email validator

import Field from './component-field';
import RegionSelect from './component-region';

//const content = document.createElement('div');
//document.body.appendChild(content);

class Form extends React.Component {

  static propTypes = {
    people: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    saveStatus: PropTypes.string.isRequired,
    fields: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    fields: this.props.fields || {
      name: '',
      email: '',
      password: '',
      country: null,
    },
    fieldErrors: {}
  };

  componentWillReceiveProps(update){
    this.setState({fields: update.fields});
  }

  onFormSubmit = (evt) => {
    const person = this.state.fields;

    evt.preventDefault();

    if (this.validate()) return;

    this.props.onSubmit([...this.props.people, person])
  };

  onInputChange = ({ name, value, error }) => {
    const fields = this.state.fields;
    const fieldErrors = this.state.fieldErrors;

    fields[name] = value;
    fieldErrors[name] = error;

    this.setState({ fields, fieldErrors });
  };

  validate = () => {
    const person = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
    //New array to get all of the field error with value true
    const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

    if (!person.name) return true;
    if (!person.email) return true;
    if (!person.password) return true;
    if (!person.country) return true;
    if (errMessages.length) return true;

    return false;
  };

  render() {
    if (this.props.isLoading){
      return <img alt='loading' src='/img/loading.gif' />;
    }

    const dirty = Object.keys(this.state.fields).length;
    let status = this.props.saveStatus;
    if (status === 'SUCCESS' && dirty) status = 'READY';

    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit} className='ui form'>

          <Field
            placeholder='Name'
            name='name'
            type="text"
            value={this.state.fields.name}
            onChange={this.onInputChange}
            validate={(val) => (val ? false : 'Name Required')}
          />

          <br />

          <Field
            placeholder='Email'
            name='email'
            type="text"
            value={this.state.fields.email}
            onChange={this.onInputChange}
            validate={(val) => (isEmail(val) ? false : 'Invalid Email')}
          />

          <br />

          <Field
            placeholder='Password'
            name='password'
            value={this.state.fields.password}
            onChange={this.onInputChange}
            type="password"
            validate={(val) => (
                                  val.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})') 
                                  ? false : 'Password needs contain 1 upper, 1 lower , 1 special simbol, at least 8 characters'
                                )}
          />

          <br />

           <RegionSelect
            country={this.state.fields.country}
            state={this.state.fields.state}
            onChange={this.onInputChange}
            validate={(val) => (val ? false : 'Country is required')}
          />

          <br />
          {{
            SAVING: <input value='Saving...' className='ui button' type='submit' disabled />,
            SUCCESS: <input value='Saved!' className='ui button' type='submit' disabled />,
            ERROR: <input
            value='Save Failed - Retry?'
            type='submit'
            disabled={this.validate()}
            className='ui button'
            />,
            READY: <input
            value='Submit'
            type='submit'
            disabled={this.validate()}
            className='ui button'
            />,

          }[status]}
        </form>

        <div>
          <h3>People</h3>
          <ul>
            { this.props.people.map(({ name, email, country }, i) =>
              <li key={i}>{name} ({email}) {country}</li>
            ) }
          </ul>
        </div>
      </div>
    );
  }
};

export default Form;