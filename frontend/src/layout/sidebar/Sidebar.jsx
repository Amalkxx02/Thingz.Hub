import { useState, useEffect } from "react";
import { MdSettings, MdAdd } from "react-icons/md";
import { getRoom } from "../../apis/roomApi.js";
import AddTab from "../../components/dashboard/AddTab/AddTab.jsx";
import "../CompStyle.css";

const Sidebar = ({ setTab, refresh, setRefresh, userId }) => {
  const [rooms, setRooms] = useState([]);
  const [selected, setSelected] = useState("all_device");

  const fetchAvailableRoom = async () => {
      try {
        const rooms = await getRoom(userId);
        setRooms(rooms);
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    fetchAvailableRoom();
  }, [userId]);

  useEffect(() => {
    if (refresh) {
      fetchAvailableRoom();
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <aside className="Sidebar">
      <div className="Sidebar-header">Thingz.Hub</div>
      <div
        className={`Sidebar__item Sidebar__item--primary ${
          selected === "all_device" ? "Sidebar__item--selected" : ""
        }`}
        onClick={() => setSelected("all_device")}
      >
        All Devices
      </div>

      <div className="Sidebar__list__heading">ROOMS</div>

      <div className="Sidebar__roomList">
        {rooms.map((room) => (
          <div
            key={room.room_id}
            className={`Sidebar__item Sidebar__item--primary ${
              selected === room.room_name ? "Sidebar__item--selected" : ""
            }`}
            onClick={() => setSelected(room.room_name)}
            style={{ backgroundColor: room.room_color }}
          >
            {room.room_name}
          </div>
        ))}
      </div>

      <div className="SidebarControl add">
        Add
        <MdAdd />
        <div className="add-menu">
          <AddTab setTab={setTab} />
        </div>
      </div>
      <div className="SidebarControl">
        Settings
        <MdSettings />
      </div>
    </aside>
  );
};

export default Sidebar;
