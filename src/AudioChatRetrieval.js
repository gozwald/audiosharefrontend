import React, { useState } from "react";
import "./App.css";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import ChatModule from "./chatmodule";
import { Comment, Feed, Icon, Grid } from "semantic-ui-react";
import { formatDistanceToNow } from "date-fns";
import socket from "./socket";
import Cookies from "universal-cookie";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const AudChatRetrieve = ({ ev, server }) => {
  const [postData, setPostData] = useState();

  const handleClickLike = (postid) => {
    const cookies = new Cookies();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id: postid._id,
      token: cookies.get("token"),
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${server}/reactpost/`, requestOptions).catch((error) =>
      console.log("error", error)
    );
  };

  const getChats = (id) => {
    const cookies = new Cookies();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id,
      token: cookies.get("token"),
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${server}/getchats/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setPostData(result);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <Marker position={ev.location.coordinates}>
        <Popup
          autoPan={false}
          onClose={() => {
            socket.off(ev._id);
          }}
          onOpen={() => {
            getChats(ev._id);
            socket.on(ev._id, (e) => {
              setPostData(e);
            });
          }}
        >
          {postData && (
            <>
              <div className={"popup"}>
                <div className={"audContainer"}>
                  <Comment.Group size="small">
                    <Comment>
                      <Comment.Avatar src={postData.user.pic} />
                      <Comment.Content>
                        <Comment.Author as="a">
                          {postData.user.first}
                        </Comment.Author>
                        <Comment.Metadata>
                          <div>
                            {formatDistanceToNow(new Date(postData.createdAt), {
                              addSuffix: true,
                            })}
                          </div>
                        </Comment.Metadata>
                        <div>
                          <Icon color="green" name="like" disabled />
                          {postData.react.length} Likes
                          <Icon
                            style={{ marginLeft: "15px" }}
                            color="green"
                            name="comment"
                            disabled
                          />{" "}
                          {postData.chats.length} Comments
                        </div>
                      </Comment.Content>
                    </Comment>
                  </Comment.Group>
                  <audio
                    src={postData.audioContent}
                    controls
                    preload={"metadata"}
                  />
                  <Feed>
                    <Grid divided>
                      <Grid.Row columns={2}>
                        <Grid.Column>
                          <Icon
                            onClick={() => handleClickLike(postData)}
                            link
                            name="thumbs up outline"
                          />
                          Like
                        </Grid.Column>
                        <Grid.Column>
                          <Icon name="share alternate" />
                          Share
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Feed>
                </div>
                <ChatModule
                  setPostData={setPostData}
                  server={server}
                  postData={postData}
                />
              </div>
            </>
          )}
        </Popup>
      </Marker>
    </>
  );
};

export default AudChatRetrieve;
