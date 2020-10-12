import React, { useState, useEffect } from "react";
import "./register.css";
import Cookies from "universal-cookie";
import { Redirect, Link } from "react-router-dom";
import TransitionsModal from "./modal"

const Register = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const data = {
      first: e.target.first.value,
      last: e.target.last.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    fetch("https://audiosharebackend.herokuapp.com/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // useEffect(() => {})

  return (
    <div>
      <TransitionsModal/>
      {loggedIn && <Redirect to="/findposts" />}
      <div className="main">
        <p className="sign" align="center">
          Sign Up
        </p>
        <form onSubmit={submit} className="form1">
          <input
            name="first"
            className="un"
            type="text"
            align="center"
            placeholder="First Name"
            required
          />
          <input
            name="last"
            className="un"
            type="text"
            align="center"
            placeholder="Last Name"
            required
          />
          <input
            name="email"
            className="un"
            type="email"
            align="center"
            placeholder="email"
            required
          />
          <input
            name="password"
            className="pass"
            type="password"
            align="center"
            placeholder="Password"
            required
          />
          <input className="submit" align="center" type="submit" />

          <p className="forgot" align="center">
            <Link to="/login/">Sign in here!</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
