import React, { useState, useEffect, useCallback } from "react";
import "./dashboard.css";
import "semantic-ui-css/semantic.min.css";
import { Icon, Menu, Image, Label, Feed } from "semantic-ui-react";
import ProfileEdit from "./profileedit";
import Notification from "./notification";
import { Collapse } from "react-collapse";
import socket from "./socket";
import Cookies from "universal-cookie";

const Dashboard = ({
  server,
  userdata,
  setuserdata,
  dashClose,
  setDashClose,
  setviewport,
  zoomlevel,
}) => {
  const handleItemClick = (e, { name }) => {
    activeItem !== name ? setActiveItem(name) : setActiveItem("");
  };

  const [activeItem, setActiveItem] = useState("");
  const [feedData, setFeedData] = useState([]);

  const fetchData = useCallback(
    (options) => {
      const cookies = new Cookies();
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        token: cookies.get("token"),
        options,
      });

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${server}/getfeed/`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setFeedData(result);
        })
        .catch((error) => console.log("error", error));
    },
    [server]
  );

  useEffect(() => {
    if (activeItem === "bell") {
      fetchData("read");
    }
  }, [activeItem, server, fetchData]);

  useEffect(() => {
    if (dashClose) {
      setActiveItem("");
      setDashClose(false);
    }
  }, [dashClose, setDashClose]);

  useEffect(() => {
    fetchData("view");
    socket.on(userdata._id, (e) => {
      setFeedData(e);
    });
  }, [userdata._id, fetchData]);

  return (
    <div onClick={(e) => e.stopPropagation()} className="dashboard-container">
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
            <Menu.Item>
              <Icon color={"green"} name="bell" />
              {feedData.filter((e) => e.read === false).length > 0 && (
                <Label size={"tiny"} circular color="orange" floating>
                  {feedData.filter((e) => e.read === false).length}
                </Label>
              )}
            </Menu.Item>
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
        <ProfileEdit
          server={server}
          userdata={userdata}
          setuserdata={setuserdata}
        />
      </Collapse>
      <Collapse name="bell" isOpened={activeItem === "bell"}>
        <div className="feedContainer">
          <Feed size="small">
            {feedData.map((e, ind) => (
              <Notification
                server={server}
                setviewport={setviewport}
                userdata={userdata}
                feeditem={e}
                zoomlevel={zoomlevel}
                key={ind}
              />
            ))}
          </Feed>
        </div>
      </Collapse>
    </div>
  );
};

export default Dashboard;
