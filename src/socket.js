import io from "socket.io-client";
const socket = io("https://audiosharebackend.herokuapp.com");
export default socket;
