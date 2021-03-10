import React from "react";
import { Route, Redirect } from "react-router-dom";

import store from './store/index';

function AuthRoute({ component: Component, render, ...rest }) {
	const { authObject } = store;

  return (
    <Route
      {...rest}
      render={(props) =>
        authObject.isLogin ? (
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
