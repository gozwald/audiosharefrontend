import React from "react";
import "./App.css";
import { Comment } from "semantic-ui-react";
import { formatDistanceToNow } from "date-fns";

const Conversation = ({ e }) => {
  return (
    <>
      <Comment>
        <Comment.Avatar as="a" src={e.user.pic} />
        <Comment.Content>
          <Comment.Author as="a">{e.user.first}</Comment.Author>
          <Comment.Metadata>
            <span>
              {formatDistanceToNow(new Date(e.createdAt), {
                addSuffix: true,
              })}
            </span>
          </Comment.Metadata>
          <Comment.Text>{e.message}</Comment.Text>
        </Comment.Content>
      </Comment>
    </>
  );
};

export default Conversation;
