import React, { useState } from "react";
import Login from "./login";
import Register from "./register";
import { BrowserRouter, Switch, Route } from "react-router-dom";
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
          <Register loggedIn={loggedIn} server={server} />
        </Route>
        <Route path="/findposts/">
          <FindPosts loggedin={loggedIn} server={server} />
        </Route>
        <Route exact path="/">
          <Login
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            server={server}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
