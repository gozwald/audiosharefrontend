import React, { useState } from "react";
import "./App.css";
import { Comment, Form, Button } from "semantic-ui-react";
import { formatDistanceToNow } from "date-fns";
import Cookies from "universal-cookie";

const ChatModule = ({ setChatList, server, ev, chatList }) => {
  const [value, setValue] = useState("");

  const post = (userid, content) => {
    const cookies = new Cookies();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id: userid,
      message: content,
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

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (ev, e) => {
    e.preventDefault();
    if (value) {
      post(ev._id, value);
      setValue("");
    } else {
      alert("type something dammit!");
    }
  };

  return (
    <>
      <div className={"chatContainer"}>
        <Comment.Group size="tiny">
          {chatList &&
            chatList.map((e, ind) => (
              <div key={ind}>
                <Comment>
                  <Comment.Avatar as="a" src={e.user.pic} />
                  <Comment.Content>
                    <Comment.Author as="a">{e.user.first}</Comment.Author>
                    <Comment.Metadata>
                      <span>
                        {formatDistanceToNow(new Date(e.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </Comment.Metadata>
                    <Comment.Text>{e.message}</Comment.Text>
                  </Comment.Content>
                </Comment>
              </div>
            ))}
        </Comment.Group>
      </div>
      <div className={"replyContainer"}>
        <Form reply onSubmit={(e) => handleSubmit(ev, e)}>
          <Form.TextArea rows={1} value={value} onChange={handleChange} />
          <Button
            type="submit"
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form>
      </div>
    </>
  );
};

export default ChatModule;
