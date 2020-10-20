import React, { useEffect } from "react";
import Cookies from "universal-cookie";

const Auth = ({ setLoggedIn, setRender, setuserdata }) => {
  const server = "http://localhost:3000";

  useEffect(() => {
    const cookies = new Cookies();
    if (cookies.get("token")) {
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
            setRender(true);
            throw new Error("invalid token");
          }
        })
        .then((data) => {
          setRender(true);
          setLoggedIn(true);
          setuserdata(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setRender(true);
    }
  }, [setLoggedIn, setRender, setuserdata]);

  return <></>;
};

export default Auth;
