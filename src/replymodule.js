import React, { useState } from "react";
import "./App.css";
import { Form, Button } from "semantic-ui-react";
import Cookies from "universal-cookie";

const ReplyModule = ({ server, ev, setChatList }) => {
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
      .then((result) => console.log(result.chats))
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

export default ReplyModule;
