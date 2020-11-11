import React, { useState } from "react";
import "./App.css";
import { Feed } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { formatDistanceToNow } from "date-fns";
import PostModule from "./postmodule";

const Notification = ({
  feeditem,
  setviewport,
  zoomlevel,
  userdata,
  server,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Feed.Event onClick={() => setOpen(true)}>
        <PostModule
          zoomlevel={zoomlevel}
          setviewport={setviewport}
          userdata={userdata}
          server={server}
          postid={feeditem.postlocator._id}
          open={open}
          setOpen={setOpen}
        />
        <Feed.Label image={feeditem.item.user.pic} />
        <Feed.Content>
          <Feed.Date>
            {formatDistanceToNow(new Date(feeditem.createdAt), {
              addSuffix: true,
            })}
          </Feed.Date>
          <Feed.Summary>
            {feeditem.item.user.first} {feeditem.item.user.last}{" "}
            {feeditem.type === "chat"
              ? "commented on your post"
              : feeditem.type === "reply"
              ? "replied to a post you're following"
              : feeditem.type === "react"
              ? "liked your post"
              : ""}
          </Feed.Summary>
          <Feed.Extra text>
            {feeditem.item.message && feeditem.item.message}
          </Feed.Extra>
        </Feed.Content>
      </Feed.Event>
    </>
  );
};

export default Notification;
