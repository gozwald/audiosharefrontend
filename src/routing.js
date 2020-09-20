import React from "react";
import "./login.css";
import Post from "./post";
import Login from "./login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import FindPosts from "./findPosts";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/findposts/">
          <FindPosts />
        </Route>
        <Route path="/post/">
          <Post />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
