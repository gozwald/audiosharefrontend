import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Auth from "./auth";

const ProtectedRoute = ({ FindPosts }) => {
  const [loggedIn, setLoggedin] = useState(true);

  const setLog = (e) => {
    setLoggedin(e);
  };

  return (
    <>
      <Auth setLoggedIn={setLog} />
      {loggedIn ? <FindPosts /> : <Redirect to={{ pathname: "/" }} />}
    </>
  );
};

export default ProtectedRoute;
