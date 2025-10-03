import React, { useState, useEffect } from 'react';
import { MdSettings, MdAdd } from 'react-icons/md';
import { fetchRoom } from '../../apis/room.js';
import './CompStyle.css';

const Sidebar = ({setShowDiv}) => {
  const [rooms, setRooms] = useState([]);
  const [selected, setSelected] = useState("all_device");

  useEffect(() => {
    fetchRoom()
      .then((data) => setRooms(data))
      .catch((err) => console.log(err));
  }, []);



  return (

    <aside className="Sidebar">

      <div className="Sidebar-header">Thingz.Hub</div>

      {/* All Devices - Primary and Selected Item */}
      <div className={`Sidebar__item Sidebar__item--primary ${selected === "all_device" ? "Sidebar__item--selected" : ""}`}
        onClick={() => setSelected("all_device")}>
        All Devices
      </div>

      <div className="Sidebar__list__heading">ROOMS</div>

      <div className="Sidebar__roomList">
        {/* Room Items - Use the base item style */}
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`Sidebar__item Sidebar__item--primary ${selected === room.name ? "Sidebar__item--selected" : ""}` }
            onClick={() => setSelected(room.name)}
            style={{backgroundColor:room.color}}>
            {room.name}
          </div>
        ))}
        {/* ... other rooms ... */}
      </div>

      {/* Add Control Block */}
        <div className="SidebarControl" onClick={()=> setShowDiv(true)}>
          Add
          <MdAdd />
        </div>
      <div className="SidebarControl">
        Settings
        <MdSettings />
      </div>

    </aside>
  );
};


export default Sidebar;