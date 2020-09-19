import React, { useState, useEffect } from "react";
import "./App.css";
// import { ReactMic } from "react-mic";
import { useVoiceRecorder } from "use-voice-recorder";
import Cookies from "universal-cookie";

const Post = () => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }, []);

  const [blob, setBlob] = useState(null);
  const { isRecording, stop, start } = useVoiceRecorder((data) => {
    setBlob(data);
  });

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  const post = () => {
    const location = JSON.stringify({
      type: "Point",
      coordinates: [lat, lon],
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

    fetch("https://audiosharebackend.herokuapp.com/audiopost/", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <div>
        <h1>Voices:</h1>
        <div>
          <h3>On air: {isRecording ? "on" : "off"}</h3>
          <button onClick={start}>Start</button>
          <button onClick={stop}>Stop</button>
        </div>
        <div>
          <h1>Blob:</h1>
          {blob && (
            <div>
              <audio
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
    </div>
  );
};

export default Post;
