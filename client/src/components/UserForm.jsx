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
      <h1>Register</h1>
      <form>
        <input
          onChange={onChange}
          type="text"
          placeholder="First Name"
          name="first_name"
          value={first_name}
        />

        <input
          onChange={onChange}
          type="text"
          placeholder="Last Name"
          name="last_name"
          value={last_name}
        />

        <input
          onChange={onChange}
          type="text"
          placeholder="Email"
          name="email"
          value={email}
        />

        <input
          onChange={onChange}
          type="text"
          placeholder="Username"
          name="username"
          value={username}
        />
        {passwordAsk && (
          <>
        <input
          onChange={onChange}
          type="password"
          placeholder="Password"
          name="password"
          value={password}
        />
        </>
      )}
          <button type="submit" onClick={onSubmit}>
            {submitButtonText}
          </button>
          <button type="submit" onClick={onClick}>
            {backButtonText}
          </button>
        </form>
      </div>
    )
  );
};
