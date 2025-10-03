import React from 'react';
import './CompStyle.css';

const Header = () => {
  return (
    <header className="header-bar">
      <div className="search-bar">
        <input type="text" placeholder="Search devices..." />
      </div>
    </header>
  );
};


export default Header;