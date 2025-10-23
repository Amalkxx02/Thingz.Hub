import { useState } from "react";
import { addRoom } from "../../../apis/roomApi";
import InputField from "../../common/inputField/InputField";
import Button from "../../common/Button/Button";
import useApiSubmission from "../../hooks/useApiSubmission";
import "./AddRoom.css";

const AddRoom = ({ setTab, setRefresh, userId }) => {
  const { success, execute, loading, error } = useApiSubmission();
  const [roomName, setRoomName] = useState("");

  const predefinedColors = [
    "#b5d5ff6b", // Light Blue
    "#c7e9b46b", // Light Green
    "#fff0b56b", // Light Yellow
    "#ffb5b56b", // Light Red
    "#d1b5ff6b", // Light Purple
    "#b5fff06b", // Cyan
    "#ffe0b56b", // Orange
    "#e0e0e06b", // Light Gray
  ];
  const [roomColor, setRoomColor] = useState(predefinedColors[0]);


  const onSubmitAddRoom = async (e) => {
    e.preventDefault();
    const roomData = {
      room_name: roomName,
      room_color: roomColor,
    };
    await execute(addRoom, userId, roomData);
  };

  return (
    <div className="add-room-container p-8 w-full min-h-lg max-w-lg rounded-2xl">
      <h2 className="form-title">Add New Room</h2>
      <form onSubmit={onSubmitAddRoom}>
        <div className="form-group">
          <label htmlFor="roomName">Room Name</label>
          <InputField
            type="custom"
            value={roomName}
            placeholder="e.g., Living Room, Kitchen"
            onChange={setRoomName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="roomColor">Room Color</label>
          <div className="color-swatch-container">
            {predefinedColors.map((color) => (
              <div
                key={color}
                className={`color-swatch ${
                  roomColor === color ? "selected" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setRoomColor(color)}
                title={color}
              />
            ))}
          </div>
        </div>

        <div className="form-actions">
          <Button type="button" onClick={()=> {setTab(''); setRefresh(true);}}>
            Close
          </Button>
          <Button type="submit" isLoading={loading}>
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AddRoom;
