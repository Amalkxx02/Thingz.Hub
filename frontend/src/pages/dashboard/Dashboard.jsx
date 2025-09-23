import React from 'react';
import Header from '../../components/dashboard/Header.jsx';
import Sidebar from '../../components/dashboard/Sidebar.jsx';


import './Dashboard.css'; // Importing the CSS file

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Header />
      <div className="bottom-container">
        <Sidebar />
        <div className="main-content">
          {/* Device cards will be placed here */}
          <div className="device-grid">
            {/* Example: <DeviceCard /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;