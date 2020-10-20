import React, { useState } from "react";
import "./dashboard.css";
import "semantic-ui-css/semantic.min.css";
import { Icon, Menu, Image } from "semantic-ui-react";
import ProfileEdit from "./profileedit";
import { Collapse } from "react-collapse";

const Dashboard = ({ server, userdata }) => {
  const handleItemClick = (e, { name }) => {
    activeItem !== name ? setActiveItem(name) : setActiveItem("");
  };

  const [activeItem, setActiveItem] = useState("");

  return (
    <div className="dashboard-container">
      <div className="upper">
        <span style={{ marginLeft: "15px" }}>
          <Image src={userdata.pic} avatar />
          <span style={{ marginLeft: "5px" }}>{userdata.first}</span>
        </span>
        <Menu compact secondary icon>
          <Menu.Item
            name="bell"
            active={activeItem === "bell"}
            onClick={handleItemClick}
          >
            <Icon color={"green"} name="bell" />
          </Menu.Item>

          <Menu.Item
            name="setting"
            active={activeItem === "setting"}
            onClick={handleItemClick}
          >
            <Icon color={"green"} name="setting" />
          </Menu.Item>
        </Menu>
      </div>
      <Collapse name="setting" isOpened={activeItem === "setting"}>
        <ProfileEdit server={server} userdata={userdata} />
      </Collapse>
    </div>
  );
};

export default Dashboard;
