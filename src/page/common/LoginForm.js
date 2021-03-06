import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { observer } from "mobx-react";

function LoginForm({ isLogin, login, location }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    try {
      login({ id, password });
    } catch (e) {
      alert("Failed to login");
      setId("");
      setPassword("");
    }
  };

  const { from } = location.state || { from: { pathname: "/" } };
  if (isLogin) return <Redirect to={from} />;

  return (
    <>
      <h1>Login</h1>
      <input
        value={id}
        onChange={({ target: { value } }) => setId(value)}
        type="text"
        placeholder="Id"
      />
      <input
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
        type="password"
        placeholder="password"
      />
      <button onClick={handleClick}>Login</button>
    </>
  );
}

export default observer(LoginForm);
