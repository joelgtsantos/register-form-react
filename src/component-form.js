import React from 'react';
import isEmail from 'validator/lib/isEmail'; //Only the email validator

import Field from './component-field';
import RegionSelect from './component-region';

const content = document.createElement('div');
document.body.appendChild(content);

class Form extends React.Component {
  state = {
    fields: {
      name: '',
      email: '',
      password: '',
      country: '',
    },
    fieldErrors: {},
    people: [],
  };

  onFormSubmit = (evt) => {
    const people = this.state.people;
    const person = this.state.fields;

    evt.preventDefault();

    if (this.validate()) return;

    this.setState({
      people: people.concat(person),
      fields: {
        name: '',
        email: '',
        password: '',
        country: '',
      },
    });
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
            country={this.state.fields.department}
            state={this.state.fields.course}
            onChange={this.onInputChange}
            validate={(val) => (val ? false : 'Country is required')}
          />

          <br />          

          <input type='submit' class='ui button' disabled={this.validate()} />
        </form>

        <div>
          <h3>People</h3>
          <ul>
            { this.state.people.map(({ name, email, country }, i) =>
              <li key={i}>{name} ({email}) {country}</li>
            ) }
          </ul>
        </div>
      </div>
    );
  }
};

export default Form;