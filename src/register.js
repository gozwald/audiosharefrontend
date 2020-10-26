import React, { useState } from "react";
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

const Register = ({ server }) => {
  const [registered, setRegistered] = useState(null);
  const [error, setError] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    const data = {
      first: e.target.first.value,
      last: e.target.last.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    fetch(`${server}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json().then((data) => {
            setRegistered(data);
          });
        }
        if (response.status === 400) {
          return response.json().then((data) => {
            setError(data);
          });
        } else {
          setError(true);
          throw new Error();
        }
      })
      .catch((error) => {
        console.log(error);
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
            Register a new account!
          </Header>
          <Form
            onClick={() => {
              if (error || registered) {
                setError(null);
                setRegistered(null);
              }
            }}
            error={error ? true : false}
            success={registered ? true : false}
            onSubmit={submit}
            size="large"
          >
            <Segment stacked>
              <Form.Group widths="equal">
                <Form.Input
                  name="first"
                  fluid
                  icon="user"
                  iconPosition="left"
                  id="form-subcomponent-shorthand-input-first-name"
                  placeholder="First name"
                  required
                />
                <Form.Input
                  name="last"
                  fluid
                  icon="user"
                  iconPosition="left"
                  id="form-subcomponent-shorthand-input-last-name"
                  placeholder="Last name"
                  required
                />
              </Form.Group>
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
              <Message
                success
                header="Success!"
                content={registered && registered}
              />
              <Button type="submit" color="green" fluid size="large">
                Register
              </Button>
            </Segment>
          </Form>
          <Message>
            Already registered? <Link to="/">Sign in!</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Register;
