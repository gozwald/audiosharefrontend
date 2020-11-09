import React from "react";
import "./App.css";
import { Feed } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { formatDistanceToNow } from "date-fns";

const Notification = ({ feedData, setviewport, zoomlevel }) => {
  const feedClickHandler = (e) => {
    console.log(e);
    setviewport({
      center: e.postlocator.location,
      zoom: zoomlevel,
    });
  };

  return (
    <div className="feedContainer">
      <Feed size="small">
        {feedData.map((e, ind) => (
          <Feed.Event onClick={() => feedClickHandler(e)} key={ind}>
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
        ))}
      </Feed>
    </div>
  );
};

export default Notification;
