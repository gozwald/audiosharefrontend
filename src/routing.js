import React, { useState } from "react";
import Login from "./login";
import Register from "./register";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import FindPosts from "./findPosts";
import Auth from "./auth";

const server = "https://audiosharebackend.herokuapp.com";
// const server = "http://localhost:3000";

const Router = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Auth setLoggedIn={setLoggedIn} />
      <Switch>
        <Route path="/register/">
          {!loggedIn ? (
            <Register server={server} />
          ) : (
            <Redirect to="/findposts/" />
          )}
        </Route>
        <Route path="/findposts/">
          {loggedIn ? <FindPosts server={server} /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/">
          {!loggedIn ? (
            <Login setLoggedIn={setLoggedIn} server={server} />
          ) : (
            <Redirect to="/findposts/" />
          )}
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
