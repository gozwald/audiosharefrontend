import React, { useEffect } from "react";
import Cookies from "universal-cookie";

const Auth = ({ setLoggedIn }) => {
  const server = "http://localhost:3000";

  useEffect(() => {
    const cookies = new Cookies();
    cookies.get("token") &&
      fetch(`${server}/cookieauth/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: cookies.get("token") }),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error("invalid token");
          }
        })
        .then((data) => {
          setLoggedIn(true);
          console.log(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
  }, [setLoggedIn]);

  return <></>;
};

export default Auth;
