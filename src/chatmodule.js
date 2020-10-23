import React, { useState } from "react";
import "./App.css";
import { Comment, Form, Button } from "semantic-ui-react";
import { formatDistanceToNow } from "date-fns";

const ChatModule = ({ ev, post, chatList }) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (ev, e) => {
    e.preventDefault();
    if (value) {
      post(ev._id, value);
      setValue("");
    } else {
      alert("type something dammit!");
    }
  };

  return (
    <>
      <Comment.Group size="tiny">
        {chatList &&
          chatList.map((e, ind) => (
            <div key={ind}>
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
            </div>
          ))}
      </Comment.Group>
      <Form reply onSubmit={(e) => handleSubmit(ev, e)}>
        <Form.TextArea rows={2} value={value} onChange={handleChange} />
        <Button
          type="submit"
          content="Add Reply"
          labelPosition="left"
          icon="edit"
          primary
        />
      </Form>
    </>
  );
};

export default ChatModule;
