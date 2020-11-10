import React, { useState } from "react";
import "./App.css";
import { Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import PostModule from "./postmodule";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const AudChatRetrieve = ({ ev, server, userdata, setviewport, zoomlevel }) => {
  // const user = L.icon({
  //   iconUrl: ev.user.pic,
  //   iconSize: [95, 75], // size of the icon
  //   // shadowSize: [50, 64], // size of the shadow
  //   // iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  //   // shadowAnchor: [4, 62], // the same for the shadow
  //   // popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  // });

  const testuser = L.divIcon({
    iconSize: L.point(60, 80, true),
    className: "divIcon",
    html: `
    
    <svg class="svg">
    <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
    <path d="M0.56,0.001 L0.58,0.002 L0.599,0.004 L0.619,0.006 L0.638,0.008 L0.657,0.011 L0.675,0.013 L0.693,0.017 L0.711,0.02 L0.728,0.024 L0.745,0.028 L0.762,0.032 L0.778,0.037 L0.794,0.042 L0.809,0.047 L0.824,0.052 L0.838,0.058 L0.852,0.063 L0.866,0.069 L0.878,0.076 L0.891,0.082 L0.902,0.089 L0.913,0.096 L0.924,0.103 L0.934,0.11 L0.943,0.117 L0.951,0.125 L0.959,0.133 L0.967,0.141 L0.973,0.149 L0.979,0.157 L0.984,0.165 L0.989,0.174 L0.992,0.182 L0.995,0.191 L0.997,0.2 L0.998,0.209 L0.999,0.218 L0.998,0.227 L0.997,0.236 L0.995,0.244 L0.992,0.253 L0.989,0.262 L0.984,0.27 L0.979,0.278 L0.973,0.287 L0.969,0.292 L0.745,0.633 L0.505,0.999 L0.259,0.635 L0.012,0.27 L0.013,0.27 L0.009,0.262 L0.005,0.253 L0.002,0.244 L0,0.236 L-0.001,0.227 L-0.001,0.218 L-0.001,0.209 L0,0.2 L0.002,0.191 L0.005,0.182 L0.009,0.174 L0.013,0.165 L0.018,0.157 L0.024,0.149 L0.031,0.141 L0.038,0.133 L0.046,0.125 L0.055,0.117 L0.064,0.11 L0.074,0.103 L0.084,0.096 L0.095,0.089 L0.107,0.082 L0.119,0.076 L0.132,0.069 L0.145,0.063 L0.159,0.058 L0.173,0.052 L0.188,0.047 L0.204,0.042 L0.219,0.037 L0.235,0.032 L0.252,0.028 L0.269,0.024 L0.286,0.02 L0.304,0.017 L0.322,0.013 L0.341,0.011 L0.36,0.008 L0.379,0.006 L0.398,0.004 L0.418,0.002 L0.438,0.001 L0.458,0 L0.478,0 L0.499,-0.001 L0.519,0 L0.54,0 L0.54,0 L0.56,0.001">
    </path>
    </clipPath>
    </svg>
    <div class="clipped"><img src=${ev.user.pic} /></div>`,
    // <div class="clipped" style="background-image: url(${ev.user.pic})"><img src=${ev.user.pic} class="ui small image"/></div>`,
  });

  const [open, setOpen] = useState(false);

  return (
    <>
      <Marker
        onClick={() => setOpen(true)}
        position={ev.location.coordinates}
        icon={testuser}
      >
        <PostModule
          zoomlevel={zoomlevel}
          setviewport={setviewport}
          userdata={userdata}
          server={server}
          postid={ev._id}
          closingcoords={ev.location.coordinates}
          open={open}
          setOpen={setOpen}
        />
      </Marker>
    </>
  );
};

export default AudChatRetrieve;
