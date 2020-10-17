import React from "react";
import "./register.css";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

const Login = ({ server, setLoggedIn }) => {
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
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        if (response.status === 401) {
          alert("wrong password");
          throw new Error("wrong password");
        }
        if (response.status === 500) {
          alert("error");
          throw new Error("something went wrong");
        }
      })
      .then((data) => {
        const cookies = new Cookies();
        cookies.set("token", data, { path: "/" });
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
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
            <Link to="/register/">Sign up here!</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
