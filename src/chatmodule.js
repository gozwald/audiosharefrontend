import React, { useEffect, useRef } from "react";
import "./App.css";
import { Comment } from "semantic-ui-react";
import Conversation from "./conversation";
import ReplyModule from "./replymodule";

const ChatModule = ({ server, postData, setPostData }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current &&
      messagesEndRef.current.scrollIntoView({ block: "end" });
  }, [postData.chats]);

  return (
    <>
      <div className={"chatContainer"}>
        <Comment.Group size="tiny" style={{ marginBottom: "0px" }}>
          {postData.chats.map((e, ind) => (
            <div key={ind}>
              <Conversation e={e} />
            </div>
          ))}
        </Comment.Group>
        <div ref={messagesEndRef} />
      </div>
      <div className={"replyContainer"}>
        <ReplyModule postData={postData._id} server={server} />
      </div>
    </>
  );
};

export default ChatModule;
