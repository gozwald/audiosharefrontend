import React, { useState } from "react";
import "./register.css";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import logo from "./images/logo.png";

const Login = ({ server, setrender }) => {
  const [error, setError] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    fetch(`${server}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        if (response.status === 401) {
          setError("Sorry. That email and password don't match.");
          throw new Error();
        }
        if (response.status === 500) {
          setError("Sorry. Something went wrong... :/");
          throw new Error();
        }
      })
      .then((data) => {
        const cookies = new Cookies();
        cookies.set("token", data, { path: "/" });
        setrender(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="green" textAlign="center">
            <Image src={logo} />
            Login to your account!
          </Header>
          <Form
            onClick={() => {
              if (error) {
                setError(null);
              }
            }}
            error={error ? true : false}
            onSubmit={submit}
            size="large"
          >
            <Segment stacked>
              <Form.Input
                type="email"
                name="email"
                fluid
                icon="smile"
                iconPosition="left"
                placeholder="E-mail address"
                required
              />
              <Form.Input
                name="password"
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                required
              />
              <Message
                error
                header="Oh No! There is a problem."
                content={error && error}
              />
              <Button type="submit" color="green" fluid size="large">
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            Not registered? <Link to="/register">Click here</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Login;
