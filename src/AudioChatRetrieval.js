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
import ChatModule from "./chatmodule";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const AudChatRetrieve = ({ ev, server }) => {
  const cookies = new Cookies();
  const [chatList, setChatList] = useState(null);
  const [open, setOpen] = useState(false);

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
          className={"popup"}
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
              <ChatModule
                setChatList={setChatList}
                server={server}
                ev={ev}
                chatList={chatList}
              />
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
