import React, { useState } from "react";
import "./login.css";
import Cookies from "universal-cookie";
import Post from "./post";

const Login = () => {
  const [loggedin, SetLoggedIn] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    fetch("http://localhost:3000/login/", {
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div className="main">
        <p className="sign" align="center">
          Sign in
        </p>
        <form onSubmit={submit} className="form1">
          <input
            name="username"
            className="un"
            type="text"
            align="center"
            placeholder="Username"
          />
          <input
            name="password"
            className="pass"
            type="password"
            align="center"
            placeholder="Password"
          />
          <input className="submit" align="center" type="submit" />

          {/* <p className="forgot" align="center">
            <a href="#">Forgot Password?</a>
          </p>
          <a href="#"></a> */}
        </form>
      </div>
      {/* <a href="#"></a> */}
    </div>
  );
};

export default Login;
