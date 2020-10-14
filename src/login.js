import React, { useState } from "react";
import "./register.css";
import Cookies from "universal-cookie";
import { Redirect, Link } from "react-router-dom";

const Login = ({server}) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    fetch(`${server}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const cookies = new Cookies();
        cookies.set("token", data, { path: "/" });
        console.log("Success:", data);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      {loggedIn && <Redirect to="/findposts" />}
      <div className="mainlogin">
        <p className="sign" align="center">
          Sign in!
        </p>
        <form onSubmit={submit} className="form1">
          <input
            name="email"
            className="un"
            type="text"
            align="center"
            placeholder="email"
          />
          <input
            name="password"
            className="pass"
            type="password"
            align="center"
            placeholder="Password"
          />

          <input className="submit" align="center" type="submit" />

          <p className="forgot" align="center">
            <Link to="/">Sign up here!</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
