import React, { useState } from "react";
import "./App.css";
import { useVoiceRecorder } from "use-voice-recorder";
import Cookies from "universal-cookie";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { usePosition } from "use-position";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const Post = () => {
  const watch = true;
  const { latitude, longitude } = usePosition(watch);

  const [blobURL, setBlobUrl] = useState(null);
  const [blob, setBlob] = useState(null);
  const { isRecording, stop, start } = useVoiceRecorder((data) => {
    setBlob(data);
  });

  const [servCoords, setServCoords] = useState(null);

  const postPost = (result) => {
    setBlobUrl(result.url);
    setServCoords(result.location.coordinates);
  };

  const post = () => {
    const location = JSON.stringify({
      type: "Point",
      coordinates: [latitude, longitude],
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

  return latitude && longitude ? (
    <div>
      <div>
        <h1>Voices:</h1>
        <div>
          <h3>On air: {isRecording ? "on" : "off"}</h3>
          <button onClick={start}>Start</button>
          <button onClick={stop}>Stop</button>
        </div>
        <div>
          <h1>Local Blob:</h1>
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
      {servCoords && blobURL && (
        <Map center={servCoords} zoom={15}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={servCoords}>
            <Popup>
              <audio src={blobURL} controls preload={"metadata"} />
            </Popup>
          </Marker>
        </Map>
      )}
    </div>
  ) : (
    "Site requires GPS to proceed, or loading gps coordinates"
  );
};

export default Post;
