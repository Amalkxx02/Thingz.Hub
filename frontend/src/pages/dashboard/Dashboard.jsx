import React, { useEffect, useState } from "react";
import Header from "../../components/dashboard/Header.jsx";
import Sidebar from "../../components/dashboard/Sidebar.jsx";
import DeviceCardForm from "../../components/dashboard/deviceCard/DeviceCardForm.jsx";

import "./Dashboard.css"; // Importing the CSS file

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="grid-container">
          <div className="device-grid">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
