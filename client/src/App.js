import React, { Component } from 'react';
import './App.css';
import { Link, Route, withRouter } from "react-router-dom";
import UserForm from './components/UserForm';
import LoginForm from "./components/LoginForm";
import EventForm from './components/EventForm';
import EventPage from './components/EventPage';
import LogoutForm from './components/LogoutForm';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer';

import {
  createNewUser,
  editUser,
  loginUser,
  fetchUserEvents,
  verifyToken,
} from "./services/users";
import {
  createNewEvent,
  fetchAllEvents,
  fetchEvent,
  fetchEventUsers,
} from "./services/events";

class App extends Component {
  constructor(props) {
  super(props);

  this.state = {
    registerFormData: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
    },
    loginFormData: {
      email: "",
      password: ""
    },
    toggleLogin: true,
    currentUser: {},
    currentEvent: {},
    eventsList: [],
  }
  this.handleLogin = this.handleLogin.bind(this);
  this.handleLoginClick = this.handleLoginClick.bind(this);
  this.handleLoginFormChange = this.handleLoginFormChange.bind(this);
  this.handleLogout = this.handleLogout.bind(this);
  this.handleToggleLocalRegister = this.handleToggleLocalRegister.bind(this);
  this.handleRegister = this.handleRegister.bind(this);
  this.handleRegisterFormChange = this.handleRegisterFormChange.bind(this);
  this.userEvents = this.userEvents.bind(this);
}

  async componentDidMount() {
    const currentUser = await verifyToken();
    const eventsList =  await this.userEvents(currentUser.id)
    this.setState({
      currentUser,
      eventsList
    })
  }

  async handleLogin(e) {
  e.preventDefault();
  const currentUser = await loginUser(this.state.loginFormData);
  console.log("userdata from handleLogin", currentUser);
  this.setState({
    loginFormData: {
      email: "",
      password: ""
    },
    currentUser: currentUser.user
  });
  this.props.history.push(`/user/${this.state.currentUser.id}/username/${this.state.currentUser.username}`);
}

handleLoginClick(e) {
  e.preventDefault();
  console.log("I want to register: handleLoginClick button".toggleLogin);
  this.setState((prevState, newState) => ({
    toggleLogin: !prevState.toggleLogin
  }));
}
handleToggleLocalRegister(e) {
  e.preventDefault();
  console.log("I want to toggleLocal: handleLoginClick button".toggleLogin);
  const { name, value } = e.target;
  this.setState((prevState, newState) => ({
    registerFormData: {
      ...prevState.registerFormData,
      [name]: !prevState.value
    }
  }));
}

handleLoginFormChange(e) {
  const { name, value } = e.target;
  this.setState(prevState => ({
    loginFormData: {
      ...prevState.loginFormData,
      [name]: value
    }
  }));
}
handleRegisterFormChange(e) {
  const { name, value } = e.target;
  console.log("handleRegisterChange name, val", name, value);
  this.setState(prevState => ({
    registerFormData: {
      ...prevState.registerFormData,
      [name]: value
    }
  }));
}
async handleRegister(e) {
  e.preventDefault();
  const currentUser = await createNewUser(this.state.registerFormData);
  console.log(currentUser);
  this.setState((prevState, newState) => ({
    currentUser: currentUser.user,
    registerFormData: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    }
  }));
  this.props.history.push(`/user/${this.state.currentUser.id}/username/${this.state.currentUser.username}`);
}

handleLogout() {
  localStorage.removeItem("authToken");
  this.setState({
    currentUser: {},
    toggleLogin: true
  });
  this.props.history.push(`/`);
}

async userEvents(id) {
  const eventsList = await fetchUserEvents(id);
  return eventsList
}

  render() {
    return (
      <div className="Main-app-body">
        <h1 className="main-title">
          <Link to="/home">Everybody Eats</Link>
        </h1>
        <Route
          exact
          path="/"
          render={props => (
            <>
              <LoginForm
                {...props}
                show={this.state.currentUser}
                toggle={this.state.toggleLogin}
                onChange={this.handleLoginFormChange}
                onSubmit={this.handleLogin}
                email={this.state.loginFormData.email}
                password={this.state.loginFormData.password}
                onClick={this.handleLoginClick}
              />
            <UserForm
              {...props}
              title={"Register User"}
              onClick={this.handleLoginClick}
              show={this.state.currentUser}
              toggle={this.state.toggleLogin}
              onChange={this.handleRegisterFormChange}
              onSubmit={this.handleRegister}
              first_name={this.state.registerFormData.first_name}
              last_name={this.state.registerFormData.last_name}
              username={this.state.registerFormData.username}
              email={this.state.registerFormData.email}
              password={this.state.registerFormData.password}
              submitButtonText="Submit"
              backButtonText="Back to Login"
              passwordAsk={"y"}
              toggleLocal={this.state.handleToggleLocalRegister}
            />
            </>
          )}
        />
      <Route
        exact
        path="/user/:user_id/username/:user_username"
        render={props => (
            <UserProfile
              {...props}
              currentUser={this.state.currentUser}
              eventsList={this.state.eventsList}
              hostingEventsList={this.state.hostingEventsList}
            />
        )}
      />
        <Route
          exact
          path="/events/:user_id/new"
          render={() => (
            <EventForm
              eventData={this.state.eventData}
              onChange={this.handleEventFormChange}
              onSubmit={this.handleSubmit}
              currentUser={this.state.currentUser}
            />
          )}
        />
        <Route
          exact
          path="/events/:event_id"
          render={() => <EventPage userData={this.state.currentUser} />}
        />
        <Route
        exact
        path="/logout"
        render={props => (
          <LogoutForm {...props} handleLogout={this.handleLogout} />
        )}
      />
      <Footer
          handleLogout={this.handleLogout}
          show={this.state.currentUser}
          currentUser={this.state.currentUser}
        />
      </div>
    );
  }
}

export default withRouter(App);
