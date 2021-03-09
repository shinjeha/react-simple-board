import "./App.css";
import React, { useState } from "react";
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
//import Header from "./include/Header";
import Home from "./page/common/Home";
import PostMain from "./page/post/PostMain";
import PostView from "./page/post/PostView";
import NotFound from "./page/common/NotFound";
import AuthRoute from "./AuthRoute";
import LoginForm from "./page/common/LoginForm";
import LogoutButton from "./page/common/LogoutButton";
import MovieList from "./page/movie/MovieList";

import { signIn } from "./util/Auth";

// test
//import Profile from "./test/Profile";
//import { signIn } from "./test/auth.js";
import mobxCounter from "./mobxtest/mobxCounter";

function App() {
  //const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const authenticated = token != null;

  //const login = ({ email, password }) => setUser(signIn({ email, password }));
  const login = async ({ id, password }) =>
    setToken(await signIn({ id, password }));
  //const logout = () => setUser(null);
  const logout = () => setToken(null);

  return (
    <BrowserRouter>
      <header>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/profile">
          <button>Profile</button>
        </Link>
        <Link to="/movieList">
          <button>movieList</button>
        </Link>
        <Link to="/postMain">
          <button>postMain</button>
        </Link>
        {authenticated ? (
          <>
            <LogoutButton logout={logout} />
            <span className="isLogin">on</span>
          </>
        ) : (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <span className="isLogin">off</span>
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
                authenticated={authenticated}
                login={login}
                {...props}
              />
            )}
          />
          {/* <AuthRoute
            authenticated={authenticated}
            path="/profile"
            render={(props) => <Profile user={user} {...props} />}
          /> */}
          <AuthRoute
            authenticated={authenticated}
            path="/movieList"
            render={(props) => <MovieList token={token} {...props} />}
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

export default App;
