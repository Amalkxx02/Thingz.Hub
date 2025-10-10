import { useState } from "react";
import Header from "../../layout/header/Header.jsx";
import Sidebar from "../../layout/sidebar/Sidebar.jsx";

import AddRoom from "../../components/dashboard/AddRoom/AddRoom.jsx";
import AddDevice from "../../components/dashboard/AddDevice/AddDevice.jsx";
import AddThingCard from "../../components/dashboard/AddThingCard/AddThingCard.jsx";
import ThingzGrid from "../../components/dashboard/ThingzGrid/ThingzGrid.jsx";

import "./Dashboard.css"; // Importing the CSS file

const Dashboard = () => {
  const [tab, setTab] = useState("");
  const [refresh,setRefresh] = useState(false)
  const [userId] = useState(localStorage.getItem("user_id"));

  const tabComponents = {
    "Add Room": () => <AddRoom setTab={setTab} setRefresh={setRefresh} userId={userId} />,
    "Add Device": () => <AddDevice setTab={setTab} userId={userId} />,
    "Add Thing Card": () => <AddThingCard setTab={setTab} userId={userId} />,
  };

  return (
    <div className="dashboard-container">
      <Sidebar setTab={setTab} refresh={refresh} setRefresh={setRefresh} userId={userId} />
      {tabComponents[tab] && (
        <div className="overlay">{tabComponents[tab]()}</div>
      )}
      <div className="main-content">
        <Header />
        <div className="grid-container">
          <ThingzGrid userId={userId}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
