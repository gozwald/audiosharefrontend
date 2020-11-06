import React, { useState, useEffect } from "react";
import "./App.css";
import { usePosition } from "use-position";
import { Map, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import MarkerClusterGroup from "react-leaflet-markercluster";
import AudChatRetrieve from "./AudioChatRetrieval";
import mylocation from "./images/mylocation.png";
import Post from "./post";
import "./mic.css";
import Cookies from "universal-cookie";
import Dashboard from "./dashboard";

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

const FindPosts = ({ server, userdata, setuserdata }) => {
  const cookies = new Cookies();
  const watch = false;
  const { latitude, longitude } = usePosition(watch);
  const [results, setResults] = useState(false);
  const [viewport, setViewport] = useState(null);
  const [triggerRender, setTriggerRender] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(null);

  // temp consts with known posts

  // const latitude = 43.935169099999996;
  // const longitude = 6.0679194;
  const trigRender = () => {
    setTriggerRender(true);
  };

  const postFind = (result) => {
    setResults(result);
  };

  useEffect(() => {
    if (latitude && longitude && triggerRender) {
      if (!viewport)
        setViewport({
          center: [latitude, longitude],
          zoom: 15,
        });
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        location: [latitude, longitude],
        token: cookies.get("token"),
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${server}/findposts`, requestOptions)
        .then((response) => response.json())
        .then((result) => postFind(result), setTriggerRender(false))
        .catch((error) => console.log("error", error));
    }
  }, [latitude, longitude, viewport, triggerRender, server, cookies]);

  return (
    <>
      {latitude && longitude && viewport ? (
        <>
          <div className="mapwrapper">
            {results && (
              <Map
                onViewportChanged={(e) => setZoomLevel(e.zoom)}
                maxZoom={19}
                className="markercluster-map"
                viewport={viewport}
                zoomControl
              >
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Dashboard
                  setuserdata={setuserdata}
                  userdata={userdata}
                  server={server}
                />
                <Post
                  server={server}
                  trig={trigRender}
                  coords={[latitude, longitude]}
                />
                <Marker position={[latitude, longitude]} icon={green}></Marker>
                <MarkerClusterGroup spiderfyDistanceMultiplier={2.5}>
                  {results.map((ev, ind) => (
                    <AudChatRetrieve
                      zoomlevel={zoomLevel}
                      setviewport={setViewport}
                      userdata={userdata}
                      server={server}
                      key={ind}
                      ev={ev}
                    />
                  ))}
                </MarkerClusterGroup>
                )
              </Map>
            )}
          </div>
        </>
      ) : (
        "Site requires GPS to proceed, or loading gps coordinates"
      )}
    </>
  );
};

export default FindPosts;
