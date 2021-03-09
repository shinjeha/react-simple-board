import React from "react";
import { Route, Redirect } from "react-router-dom";

function AuthRoute({ isLogin, component: Component, render, ...rest }) {
  console.log(isLogin);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin ? (
          render ? (
            render(props)
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default AuthRoute;
