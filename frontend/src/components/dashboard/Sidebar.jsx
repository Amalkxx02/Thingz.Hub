import React from 'react';
import './CompStyle.css';

const Sidebar = () => {
  const menuItems = [
    { name: 'All Devices', icon: '💻' },
    { name: 'Living Room', icon: '🛋️' },
    { name: 'Kitchen', icon: '🍳' },
    { name: 'Garage', icon: '🚗' },
    { name: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className="sidebar-container">
      <div className="sidebar-header">
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item">
              {/*<span className="nav-icon">{item.icon}</span>*/}
              <span className="nav-text">{item.name}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;