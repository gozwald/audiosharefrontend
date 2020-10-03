import React, { useState, useEffect } from "react";
import "./App.css";
import { usePosition } from "use-position";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import MarkerClusterGroup from "react-leaflet-markercluster";
import AudChatRetrieve from "./AudioChatRetrieval";
import mylocation from "./images/mylocation.png";
import Post from "./post";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const green = L.icon({
  iconUrl: mylocation,
  iconSize: [95, 75], // size of the icon
  // shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const FindPosts = () => {
  const watch = true;
  const { latitude, longitude } = usePosition(watch);
  const [results, setResults] = useState(false);
  // const [viewport, setViewport] = useState(null);

  // useEffect(
  //   () =>
  //     latitude &&
  //     longitude &&
  //     setViewport({ center: [latitude, longitude], zoom: 15 }),
  //   [latitude, longitude]
  // );

  // temp consts with known posts

  // const latitude = 43.935169099999996;
  // const longitude = 6.0679194;

  const postFind = (result) => {
    setResults(result);
  };

  useEffect(() => {
    if (latitude && longitude) {
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
      fetch(
        "https://audiosharebackend.herokuapp.com/findposts/",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => postFind(result))
        .catch((error) => console.log("error", error));
    }
  }, [latitude, longitude]);

  return latitude && longitude ? (
    <>
      <div>
        <div>
          {results && (
            <Map
              className="markercluster-map"
              viewport={{
                center: [latitude, longitude],
                zoom: 15,
              }}
              onViewportChanged={(e) => {
                console.log(e);
                // setViewport(e);
              }}
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[latitude, longitude]} icon={green}>
                <Popup autoPan={false}>
                  <Post coords={[latitude, longitude]} />
                </Popup>
              </Marker>
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
    </>
  ) : (
    "Site requires GPS to proceed, or loading gps coordinates"
  );
};

export default FindPosts;
