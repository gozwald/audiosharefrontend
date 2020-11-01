import io from "socket.io-client";

const getServer = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  } else {
    return "https://audiosharebackend.herokuapp.com";
  }
};

const socket = io(getServer());

export default socket;
