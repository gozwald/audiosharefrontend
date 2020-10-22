import React, { useState, useEffect } from "react";
import "./App.css";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import Cookies from "universal-cookie";
import socket from "./socket";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const AudChatRetrieve = ({ ev, server }) => {
  const cookies = new Cookies();
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
      token: cookies.get("token"),
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${server}/chatpost/`, requestOptions)
      .then((response) => response.json())
      .then((result) => setChatList(result.chats))
      .catch((error) => console.log("error", error));
  };

  const getChats = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id,
      token: cookies.get("token"),
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${server}/getchats/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setChatList(result.chats);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    return () => socket.disconnect();
  }, []);

  return (
    <>
      <Marker position={ev.location.coordinates}>
        <Popup
          autoPan={false}
          onClose={() => {
            socket.off(ev._id);
            setOpen(false);
          }}
          onOpen={() => {
            socket.on(ev._id, (e) => {
              getChats(ev._id);
            });
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
