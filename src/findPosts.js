import React, { useState } from "react";
import "./App.css";
import { usePosition } from "use-position";
import { Map, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import MarkerClusterGroup from "react-leaflet-markercluster";
import AudChatRetrieve from "./AudioChatRetrieval";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const FindPosts = () => {
  const watch = true;
  const { latitude, longitude } = usePosition(watch);
  const [results, setResults] = useState(false);

  // temp consts with known posts

  // const latitude = 43.935169099999996;
  // const longitude = 6.0679194;

  const postFind = (result) => {
    setResults(result);
  };

  const find = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ location: [latitude, longitude] });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    // fetch("http://localhost:3000/findposts/", requestOptions)
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
          <Map
            className="markercluster-map"
            center={[latitude, longitude]}
            zoom={15}
            viewport={{}}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup>
              {results.map((ev, ind) => (
                <AudChatRetrieve key={ind} ev={ev} />
              ))}
            </MarkerClusterGroup>
            )
          </Map>
        )}
      </div>
    </div>
  ) : (
    "Site requires GPS to proceed, or loading gps coordinates"
  );
};

export default FindPosts;
