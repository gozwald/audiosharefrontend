import React, { useState, useEffect } from "react";
import "./App.css";
import { ReactMic } from "react-mic";
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

  const [record, setrecord] = useState(false);
  const [canPost, setcanPost] = useState(false);
  const [audioblob, setAudioBlob] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  const startRecording = () => {
    setrecord(true);
  };

  const stopRecording = () => {
    setrecord(false);
  };

  const onData = (recordedBlob) => {
    console.log("chunk of real-time data is: ", recordedBlob);
  };

  const onStop = (recordedBlob) => {
    setcanPost(true);
    setAudioBlob(recordedBlob);
  };

  const post = () => {
    const location = JSON.stringify({
      type: "Point",
      coordinates: [lat, lon],
    });

    const cookies = new Cookies();

    var formdata = new FormData();
    formdata.append("audio", audioblob.blob);
    formdata.append("location", location);
    formdata.append("token", cookies.get("token"));

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://localhost:3000/audiopost/", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <ReactMic
        record={record}
        className="sound-wave"
        onStop={onStop}
        onData={onData}
        strokeColor="#000000"
        backgroundColor="#FF4081"
      />
      <button onClick={startRecording} type="button">
        Start
      </button>
      <button onClick={stopRecording} type="button">
        Stop
      </button>
      {canPost && (
        <button onClick={post} type="button">
          Post
        </button>
      )}
    </div>
  );
};

export default Post;
