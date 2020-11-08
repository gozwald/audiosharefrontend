import React from "react";
import "./App.css";
import { Feed } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { formatDistanceToNow } from "date-fns";

const Notification = ({ feedData }) => {
  return (
    <div className="feedContainer">
      <Feed size="small">
        {feedData.map((e) => (
          <Feed.Event>
            <Feed.Label image={e.item.user.pic} />
            <Feed.Content>
              <Feed.Date>
                {formatDistanceToNow(new Date(e.createdAt), {
                  addSuffix: true,
                })}
              </Feed.Date>
              <Feed.Summary>
                {e.item.user.first} {e.item.user.last} commented on your post
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
