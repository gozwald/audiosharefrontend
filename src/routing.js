import React from "react";
import Post from "./post";
import Login from "./login";
import Register from "./register";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import FindPosts from "./findPosts";

const live="https://audiosharebackend.herokuapp.com"
// const local="http://localhost:3000"

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login/">
          <Login server={live} />
        </Route>
        <Route path="/findposts/">
          <FindPosts server={live} />
        </Route>
        <Route path="/post/">
          <Post server={live} />
        </Route>
        <Route path="/">
          <Register server={live} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
