import React from "react";

export default props => {
  const {
    show,
    toggle,
    first_name,
    last_name,
    username,
    email,
    password,
    onChange,
    onSubmit,
    onClick,
    submitButtonText,
    backButtonText,
    toggleLocal,
    passwordAsk,
    title,
  } = props;

  const showRegister = !toggle;
  return (
    showRegister && (
      <div className="user-form-container">
      <h1>{title}</h1>
        <form>
          <input
            id='user-name'
            onChange={onChange}
            type="text"
            placeholder="First Name"
            name="first_name"
            value={first_name}
          />
          <br/>
          <input
            id='user-last'
            onChange={onChange}
            type="text"
            placeholder="Last Name"
            name="last_name"
            value={last_name}
          />
          <br/>
          <input
            id='user-email'
            onChange={onChange}
            type="text"
            placeholder="Email"
            name="email"
            value={email}
          />
          <br/>
          <input
            id='user-username'
            onChange={onChange}
            type="text"
            placeholder="Username"
            name="username"
            value={username}
          />
          <br/>
          {passwordAsk && (
            <>
          <input
            id='user-password'
            onChange={onChange}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
          />
          <br/>
          </>
        )}
          <br/>
          <button id='user-submit' type="submit" onClick={onSubmit}>
            {submitButtonText}
          </button>
          <button id='user-back' type="submit" onClick={onClick}>
            {backButtonText}
          </button>
        </form>
      </div>
    )
  );
};
