import React, { Component } from 'react';
import './App.css';
import { Link, Route, withRouter } from "react-router-dom";
import UserForm from './components/UserForm';
import EventForm from './components/EventForm';

class App extends Component {
  constructor(props) {
  super(props);

  this.state = {
    eventData: {}
    }
  }

  render() {
    return (
      <div className="App">
        <UserForm />
        <EventForm />
      </div>
    );
  }
}

export default App;
