import React from "react";
import "./login.css";
import Post from "./post";
import Login from "./login";
import { Switch, Route } from "react-router-dom";

const Router = () => {
  return (
    <Switch>
      <Route path="/post">
        <Post />
      </Route>
      <Route path="/">
        <Login />
      </Route>
    </Switch>
  );
};

export default Router;
