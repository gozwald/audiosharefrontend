import React, { useState, useEffect } from "react";
import Login from "./login";
import Register from "./register";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import FindPosts from "./findPosts";
import Auth from "./auth";
import socket from "./socket";

const Router = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [render, setRender] = useState(false);
  const [userData, setuserData] = useState(null);
  const [server, setServer] = useState(null);

  useEffect(() => {
    process.env.NODE_ENV === "development"
      ? setServer("http://localhost:3000")
      : setServer("https://audiosharebackend.herokuapp.com");
    return () => socket.disconnect();
  }, []);

  return (
    server && (
      <BrowserRouter>
        <Auth
          render={render}
          server={server}
          setuserdata={setuserData}
          setRender={setRender}
          setLoggedIn={setLoggedIn}
        />
        {render && (
          <Switch>
            <Route path="/register/">
              {!loggedIn ? (
                <Register server={server} />
              ) : (
                <Redirect to="/findposts/" />
              )}
            </Route>
            <Route path="/findposts/">
              {loggedIn ? (
                <FindPosts
                  setuserdata={setuserData}
                  userdata={userData}
                  server={server}
                />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route exact path="/">
              {!loggedIn ? (
                <Login setrender={setRender} server={server} />
              ) : (
                <>
                  <Redirect to="/findposts/" />
                </>
              )}
            </Route>
          </Switch>
        )}
      </BrowserRouter>
    )
  );
};

export default Router;
