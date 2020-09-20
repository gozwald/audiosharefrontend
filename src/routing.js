import React from "react";
import "./login.css";
import Post from "./post";
import Login from "./login";
import { Switch, Route } from "react-router-dom";
import FindPosts from "./findPosts";

const Router = () => {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Login />
      </Route>
      <Route path="/findposts">
        <FindPosts />
      </Route>
      <Route path="/post">
        <Post />
      </Route>
    </Switch>
  );
};

export default Router;
