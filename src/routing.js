import React from "react";
import Post from "./post";
import Login from "./login";
import Register from "./register";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import FindPosts from "./findPosts";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login/">
          <Login />
        </Route>
        <Route path="/findposts/">
          <FindPosts />
        </Route>
        <Route path="/post/">
          <Post />
        </Route>
        <Route path="/">
          <Register />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
