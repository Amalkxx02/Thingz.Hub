import React from 'react';
import './CompStyle.css';

const Header = () => {
  return (
    <header className="header-bar">
      <div className="dashboard-title">
        <p>Thingz.Hub</p>
      </div>
      <div className="device-status">
        <span className="status-dot"></span>
        All devices online
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search devices..." />
      </div>
    </header>
  );
};

export default Header;