import React, { Component } from 'react';
import { render } from 'react-dom';

import logo from './logo.svg';
import './App.css';
import './semantic-dist/semantic.min.css';
import Form  from './component-form';


class App extends Component {
  render() {
    return (
      <div className="ui container">
       <Form/>
      </div>
    );
  }
}

export default App;
