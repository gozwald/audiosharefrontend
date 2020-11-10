import React, { useState } from "react";
import "./App.css";
import { Feed } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { formatDistanceToNow } from "date-fns";
import PostModule from "./postmodule";

const Notification = ({
  feedData,
  setviewport,
  zoomlevel,
  userdata,
  server,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="feedContainer">
      <Feed size="small">
        {feedData.map((e, ind) => (
          <>
            <PostModule
              zoomlevel={zoomlevel}
              setviewport={setviewport}
              userdata={userdata}
              server={server}
              postid={e.postlocator._id}
              open={open}
              setOpen={setOpen}
            />
            <Feed.Event onClick={() => setOpen(true)} key={ind}>
              <Feed.Label image={e.item.user.pic} />
              <Feed.Content>
                <Feed.Date>
                  {formatDistanceToNow(new Date(e.createdAt), {
                    addSuffix: true,
                  })}
                </Feed.Date>
                <Feed.Summary>
                  {e.item.user.first} {e.item.user.last}{" "}
                  {e.type === "chat"
                    ? "commented on your post"
                    : e.type === "reply"
                    ? "replied to a post you're following"
                    : ""}
                </Feed.Summary>
                <Feed.Extra text>{e.item.message}</Feed.Extra>
              </Feed.Content>
            </Feed.Event>
          </>
        ))}
      </Feed>
    </div>
  );
};

export default Notification;
