import React, { Component } from "react";
import "../App.css";

class UserForm extends Component {
  constructor() {
    super();

    this.state = {
      registerFormData: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="text"
            placeholder="First Name"
            name="first_name"
            value={this.first_name}
          />

          <input
            onChange={this.handleChange}
            type="text"
            placeholder="Last Name"
            name="last_name"
            value={this.last_name}
          />

          <input
            onChange={this.handleChange}
            type="text"
            placeholder="Email"
            name="email"
            value={this.email}
          />

          <input
            onChange={this.handleChange}
            type="text"
            placeholder="Username"
            name="username"
            value={this.username}
          />

          <input
            onChange={this.handleChange}
            type="password"
            placeholder="Password"
            name="password"
            value={this.password}
          />

          <input value="Submit" type="submit" />
        </form>
      </div>
    );
  }
}

export default UserForm;
