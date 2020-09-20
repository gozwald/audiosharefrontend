import React, { useState } from "react";
import "./App.css";
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

const FindPosts = () => {
  const watch = true;
  const { latitude, longitude } = usePosition(watch);
  const [results, setResults] = useState(false);

  const postFind = (result) => {
    setResults(result);
    console.log(result);
  };

  const find = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ location: [latitude, longitude] });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://audiosharebackend.herokuapp.com/findposts/", requestOptions)
      .then((response) => response.json())
      .then((result) => postFind(result))
      .catch((error) => console.log("error", error));
  };

  return latitude && longitude ? (
    <div>
      <h1>Whats around me...</h1>
      <div>
        <button onClick={find}>Go!</button>
      </div>
      <div>
        {results && (
          <Map center={[latitude, longitude]} zoom={15}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]}>
              <Popup>
                <audio src={""} controls preload={"metadata"} />
              </Popup>
            </Marker>
            <Marker position={[latitude, longitude]}>
              <Popup>
                <audio src={""} controls preload={"metadata"} />
              </Popup>
            </Marker>
          </Map>
        )}
      </div>
    </div>
  ) : (
    "Site requires GPS to proceed, or loading gps coordinates"
  );
};

export default FindPosts;
