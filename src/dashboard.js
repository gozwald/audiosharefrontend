import React, { useState } from "react";
import "./dashboard.css";
import "semantic-ui-css/semantic.min.css";
import { Form, Button, Image, Message } from "semantic-ui-react";
import Cookies from "universal-cookie";

const Dashboard = ({ server, userdata }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [user, setuser] = useState(userdata);

  const successHandler = (result) => {
    setuser(result);
    setLoading(false);
    setTimeout(() => setSuccess(false), 10000);
  };

  const post = (e) => {
    e.preventDefault();
    setLoading(true);
    const cookies = new Cookies();

    const formdata = new FormData();
    formdata.append("audio", file);
    formdata.append("first", e.target.first.value);
    formdata.append("last", e.target.last.value);
    formdata.append("bio", e.target.bio.value);
    formdata.append("token", cookies.get("token"));

    const requestOptions = {
      method: "POST",
      body: formdata,
    };
    fetch(`${server}/editprofile/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setSuccess(true);
        successHandler(result, e);
      })
      .catch((error) => console.log("error", error));
    e.target.reset();
  };

  return (
    <div className="dashboard-container">
      <Form success={success} size={"tiny"} onSubmit={post}>
        <div className="centerCenter">
          <Image
            style={{ margin: "10px" }}
            src={
              file
                ? URL.createObjectURL(file)
                : user.pic
                ? user.pic
                : "https://react.semantic-ui.com/images/wireframe/image.png"
            }
            size="tiny"
          />
          <Button
            as="label"
            htmlFor="file"
            type="button"
            size="tiny"
            compact
            color="green"
            style={{ margin: "10px" }}
            content="Choose Profile Photo"
            labelPosition="left"
            icon="file"
          />
          <input
            type="file"
            id="file"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <Form.Group widths={"equal"}>
          <Form.Input
            fluid
            name="first"
            label="First name"
            placeholder={user.first}
          />
          <Form.Input
            fluid
            name="last"
            label="Last name"
            placeholder={user.last}
          />
          {/* <Form.Input
            fluid
            id="form-subcomponent-shorthand-input-email"
            label="email"
            placeholder="email"
          /> */}
          <Form.TextArea name="bio" label="bio" placeholder={user.bio} />
        </Form.Group>
        <div className="centerCenter">
          <Button.Group>
            <Button loading={loading} type="submit" positive>
              Update
            </Button>
          </Button.Group>
        </div>
        <Message
          style={{ marginTop: "10px" }}
          success
          size="small"
          attached="bottom"
        >
          Profile Updated!
        </Message>
      </Form>
    </div>
  );
};

export default Dashboard;
