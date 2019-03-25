import React, { Component } from 'react';
import './App.css';
import { Link, Route, withRouter } from "react-router-dom";
import UserForm from './components/UserForm';

class App extends Component {
  constructor(props) {
  super(props);

  this.state = {

    }
  }
  
  render() {
    return (
      <div className="App">
        <UserForm />
      </div>
    );
  }
}

export default App;
