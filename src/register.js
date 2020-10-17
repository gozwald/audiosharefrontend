import React, { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import TransitionsModal from "./modal";

const Register = ({ server }) => {
  const [registered, setRegistered] = useState(null);
  const [error, setError] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const data = {
      first: e.target.first.value,
      last: e.target.last.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    fetch(`${server}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) =>
        response.status === 200 ? response.json() : setError(true)
      )
      .then((data) => {
        setRegistered(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {error && <TransitionsModal />}
      {registered && <TransitionsModal details={registered} />}
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
            <Link to="/">Sign in here!</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
