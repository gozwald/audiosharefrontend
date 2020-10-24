import React, { useState } from "react";
import "./App.css";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import ChatModule from "./chatmodule";
import { Comment } from "semantic-ui-react";
import { formatDistanceToNow } from "date-fns";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const AudChatRetrieve = ({ ev, server }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Marker position={ev.location.coordinates}>
        <Popup
          autoPan={false}
          onClose={() => {
            setOpen(false);
          }}
          onOpen={() => {
            setOpen(true);
          }}
        >
          {open ? (
            <>
              <div className={"popup"}>
                <div className={"audContainer"}>
                  <Comment.Group size="large">
                    <Comment>
                      <Comment.Avatar as="a" src={ev.user.pic} />
                      <Comment.Content>
                        <Comment.Author as="a">{ev.user.first}</Comment.Author>
                        <Comment.Metadata>
                          <span>
                            {formatDistanceToNow(new Date(ev.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </Comment.Metadata>
                        <Comment.Text>{ev.message}</Comment.Text>
                      </Comment.Content>
                    </Comment>
                  </Comment.Group>
                  <audio src={ev.audioContent} controls preload={"metadata"} />
                </div>
                <ChatModule server={server} ev={ev} />
              </div>
            </>
          ) : (
            "loading"
          )}
        </Popup>
      </Marker>
    </>
  );
};

export default AudChatRetrieve;
