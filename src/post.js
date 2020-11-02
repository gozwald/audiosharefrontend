import React, { useState } from "react";
import "./mic.css";
import { useVoiceRecorder } from "use-voice-recorder";
import Cookies from "universal-cookie";
import { Button } from "semantic-ui-react";

const Post = ({ coords, trig, server }) => {
  const [blob, setBlob] = useState(null);
  const { isRecording, stop, start } = useVoiceRecorder((data) => {
    setBlob(data);
  });

  const postPost = (result) => {
    console.log(result);
    setBlob(null);
    trig();
  };

  const post = () => {
    const location = JSON.stringify({
      type: "Point",
      coordinates: coords,
    });

    const cookies = new Cookies();

    const formdata = new FormData();
    formdata.append("audio", blob);
    formdata.append("location", location);
    formdata.append("token", cookies.get("token"));

    const requestOptions = {
      method: "POST",
      body: formdata,
    };
    fetch(`${server}/audiopost/`, requestOptions)
      .then((response) => response.json())
      .then((result) => postPost(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="post-container">
      {blob ? (
        <>
          <audio
            style={{ width: "200px", height: "30px", margin: "10px" }}
            src={URL.createObjectURL(blob)}
            controls
            preload={"metadata"}
          />

          <Button.Group>
            <Button onClick={() => setBlob(null)}>Cancel</Button>
            <Button.Or />
            <Button onClick={post} positive>
              Post
            </Button>
          </Button.Group>
        </>
      ) : (
        <>
          {isRecording ? (
            <div onClick={stop} className="blob animation"></div>
          ) : (
            <div onClick={start} className="blob"></div>
          )}
        </>
      )}
    </div>
  );
};

export default Post;
