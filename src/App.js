import "./App.css";
import React, { useState, useEffect } from "react";
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import { useObserver, observer } from "mobx-react";
import { autorun } from "mobx";
import store from "./store/index";
//import Header from "./include/Header";
import Home from "./page/common/Home";
import PostMain from "./page/post/PostMain";
import PostView from "./page/post/PostView";
import NotFound from "./page/common/NotFound";
import AuthRoute from "./AuthRoute";
import LoginForm from "./page/common/LoginForm";
import LogoutButton from "./page/common/LogoutButton";
import MovieList from "./page/movie/MovieList";

//import { signIn } from "./util/Auth";

// test
//import Profile from "./test/Profile";
//import { signIn } from "./test/auth.js";
import mobxCounter from "./mobxtest/mobxCounter";
import auth from "./store/auth";

import axios from './util/AxiosUt';

function App() {
  const { authObject } = store;
	console.log(authObject.isLogin);

	autorun(() => {
		if (document.cookie) {
			console.log('!!');
			authObject.isLogin = true;
		}

		if (authObject.isLogin && !authObject.accessToken) {
			console.log('@@');
			authObject.requestToken();
		}
	});

  //const [user, setUser] = useState(null);
  //const [token, setToken] = useState(null);
  //const authenticated = token != null;
  //const login = ({ id, password }) => setToken(signIn({ id, password }));
  //const login = async ({ id, password }) => setToken(await signIn({ id, password }));
  const login = ({ id, password }) => authObject.login({ id, password });
  //const logout = () => setUser(null);
  //const logout = () => setToken(null);

  return (
    <BrowserRouter>
      <header>
        <Link to="/">
          <button>Home</button>
        </Link>
        {/* <Link to="/profile">
          <button>Profile</button>
        </Link> */}
        <Link to="/movieList">
          <button>movieList</button>
        </Link>
        <Link to="/postMain">
          <button>postMain</button>
        </Link>
        {authObject.isLogin ? (
          <>
            <LogoutButton authObject={authObject} />
            <span className="checkLogin">on</span>
          </>
        ) : (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <span className="checkLogin">off</span>
          </>
        )}
        <Link to="/mobxCounter">
          <button>mobxCounter</button>
        </Link>
      </header>
      <hr />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/login"
            render={(props) => (
              <LoginForm
                isLogin={authObject.isLogin}
                login={login}
                {...props}
              />
            )}
          />
          {/* <AuthRoute
            path="/profile"
            render={(props) => <Profile user={user} {...props} />}
          /> */}
          <AuthRoute
            path="/movieList"
            render={(props) => <MovieList authObject={authObject} {...props} />}
          />
          <Route exact path="/postMain" component={PostMain} />
          <Route exact path="/postView/:no" component={PostView} />
          <Route path="/mobxCounter" component={mobxCounter} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default observer(App);
