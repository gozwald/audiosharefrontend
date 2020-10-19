import React from "react";
import "./dashboard.css";
import "semantic-ui-css/semantic.min.css";
import { Form } from "semantic-ui-react";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Form size={"tiny"}>
        <Form.Group widths={"equal"}>
          <Form.Input
            fluid
            id="form-subcomponent-shorthand-input-first-name"
            label="First name"
            placeholder="First name"
          />
          <Form.Input
            fluid
            id="form-subcomponent-shorthand-input-last-name"
            label="Last name"
            placeholder="Last name"
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default Dashboard;
