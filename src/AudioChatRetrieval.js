import React, { useState, useEffect } from "react";
import "./App.css";
import socketIOClient from "socket.io-client";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const ENDPOINT = `${process.env.REACT_APP_SERVER}`;
const socket = socketIOClient(ENDPOINT, { autoConnect: false });

const AudChatRetrieve = ({ ev }) => {


  const [value, setValue] = useState("");
  const [chatList, setChatList] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (ev, e) => {
    e.preventDefault();
    if (value) {
      post(ev._id);
      setValue("");
    } else {
      alert("type something dammit!");
    }
  };

  const post = (newPost) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id: newPost,
      message: value,
      email: "gozwald@gmail.com"
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_SERVER}/chatpost/`, requestOptions)
      .then((response) => response.json())
      .then((result) => setChatList(result.chats))
      .catch((error) => console.log("error", error));
  };

  const getChats = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_SERVER}/getchats/`, requestOptions)
      .then((response) => response.json())
      .then((result) => setChatList(result.chats))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    open &&
      socket.connect();
      socket.on(ev._id, () => {
        getChats(ev._id);
      });
  }, [open, ev._id]);

  return (
    <>
      <Marker position={ev.location.coordinates}>
        <Popup
          autoPan={false}
          onClose={() => {
            socket.disconnect();
            setOpen(false);
          }}
          onOpen={() => {
            getChats(ev._id);
            setOpen(true);
          }}
        >
          {open ? (
            <>
              <audio src={ev.audioContent} controls preload={"metadata"} />
              {chatList &&
                chatList.map((e, ind) => <div key={ind}>{e.message}</div>)}
              <form onSubmit={(e) => handleSubmit(ev, e)}>
                <label>
                  Respond!
                  <input type="text" value={value} onChange={handleChange} />
                </label>
                <input type="submit" value="Go!" />
              </form>
            </>
          ) : (
            "loading"
          )}
        </Popup>
      </Marker>
    </>
  );
};

export default AudChatRetrieve;
