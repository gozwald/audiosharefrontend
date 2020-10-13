import React, { useState } from "react";
import "./mic.css";
import { useVoiceRecorder } from "use-voice-recorder";
import Cookies from "universal-cookie";

const Post = ({ coords, trig }) => {
  const [blob, setBlob] = useState(null);
  const { isRecording, stop, start } = useVoiceRecorder((data) => {
    setBlob(data);
  });

  const postPost = (result) => {
    console.log(result);
    trig();
  };

  const post = () => {
    const location = JSON.stringify({
      type: "Point",
      coordinates: coords,
    });

    const cookies = new Cookies();

    var formdata = new FormData();
    formdata.append("audio", blob);
    formdata.append("location", location);
    formdata.append("token", cookies.get("token"));

    var requestOptions = {
      method: "POST",
      body: formdata,
    };
    fetch("http://localhost:3000/audiopost/", requestOptions)
    // fetch("https://audiosharebackend.herokuapp.com/audiopost/", requestOptions)
      .then((response) => response.json())
      .then((result) => postPost(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="post-container">
      {isRecording ? (
        <div onClick={stop} className="blob animation"></div>
      ) : (
        <div onClick={start} className="blob"></div>
      )}

      <div>
        {blob && (
          <div>
            <audio
              style={{ width: "200px", height: "30px", margin: "10px" }}
              src={window.URL.createObjectURL(blob)}
              controls
              preload={"metadata"}
            />
          </div>
        )}
      </div>
      {blob && (
        <button onClick={post} type="button">
          Post
        </button>
      )}
    </div>
  );
};

export default Post;
