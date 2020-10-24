import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { Comment } from "semantic-ui-react";
import Cookies from "universal-cookie";
import Conversation from "./conversation";
import socket from "./socket";
import ReplyModule from "./replymodule";

const ChatModule = ({ server, ev }) => {
  const cookies = new Cookies();
  const [chatList, setChatList] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current &&
      messagesEndRef.current.scrollIntoView({ block: "end" });
  }, [chatList]);

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
    getChats(ev._id);
    socket.on(ev._id, (e) => {
      setChatList(e);
    });
    return () => {
      socket.off(ev._id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={"chatContainer"}>
        <Comment.Group size="tiny" style={{ marginBottom: "0px" }}>
          {chatList &&
            chatList.map((e, ind) => (
              <div key={ind}>
                <Conversation e={e} />
              </div>
            ))}
        </Comment.Group>
        <div ref={messagesEndRef} />
      </div>
      <div className={"replyContainer"}>
        <ReplyModule ev={ev} setChatList={setChatList} server={server} />
      </div>
    </>
  );
};

export default ChatModule;
