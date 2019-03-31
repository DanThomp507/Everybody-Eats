import React from "react";
import { Link } from "react-router-dom";

export default props => {
  const { toggle, show, email, password, onChange, onSubmit, onClick } = props;
  const showLogin = toggle;
  return (
    showLogin && (
      <div className="user-form-container">
        <h1 className="main-title">
          <Link to="/home">Everybody <br/> Eats</Link>
        </h1>
        <form>
          <h2>Login</h2>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              onChange={onChange}
              name="email"
              id="email"
              value={email}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
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
