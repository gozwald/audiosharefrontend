import React, { useState } from "react";
import "./App.css";

const AudChatRetrieve = ({ ev }) => {
  console.log(ev);
  const [value, setValue] = useState("");
  const [chatList, setChatList] = useState(null);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (ev, e) => {
    e.preventDefault();
    post(ev._id);
  };

  const post = (newPost) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id: newPost,
      message: value,
      username: "hash",
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("http://localhost:3000/chatpost/", requestOptions)
      // fetch("https://audiosharebackend.herokuapp.com/findposts/", requestOptions)
      .then((response) => response.json())
      .then((result) => setChatList(result.chats))
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <audio src={ev.audioContent} controls preload={"metadata"} />
      {chatList
        ? chatList.map((e, ind) => <div key={ind}>{e.message}</div>)
        : ev.chats.map((e, ind) => <div key={ind}>{e.message}</div>)}

      <form onSubmit={(e) => handleSubmit(ev, e)}>
        <label>
          Respond!
          <input type="text" value={value} onChange={handleChange} />
        </label>
        <input type="submit" value="Go!" />
      </form>
    </>
  );
};

export default AudChatRetrieve;
