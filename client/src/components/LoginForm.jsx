import React from "react";
import { Link } from "react-router-dom";

export default props => {
  const { toggle, show, email, password, onChange, onSubmit, onClick } = props;
  const showLogin = toggle;
  return (
    showLogin && (
      <div className="user-form-container">
        <h1 className="main-title">Everybody Eats</h1>
        <form>
          <h2>Login</h2>
          <div className='email-password'>
            <label htmlFor="email">Email</label>
            <input
              id='email'
              type="text"
              onChange={onChange}
              name="email"
              id="email"
              value={email}
            />
          </div>
          <div className='email-password'>
            <label htmlFor="password">Password</label>
            <input
              id='password'
              type="password"
              onChange={onChange}
              name="password"
              id="password"
              value={password}
            />
          </div>
          <button id='sign-in' className='login-button' type="submit" onClick={onSubmit}>
            Sign In
          </button>
          <p id='register'> Don't have an account?
            <button className='login-button' type="submit" onClick={onClick}>
              Register Here!
            </button>
          </p>
        </form>
      </div>
    )
  );
};
