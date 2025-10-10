import { useState } from "react";
import { addRoom } from "../../../apis/roomApi";
import InputField from "../../common/inputField/InputField";
import Button from "../../common/Button/Button";
import useApiSubmission from "../../hooks/useApiSubmission";
import "./AddRoom.css";

const AddRoom = ({ setTab, setRefresh, userId }) => {
  const roomRequest = useApiSubmission();
  const [roomName, setRoomName] = useState("");

  const predefinedColors = [
    "#b5d5ff", // Light Blue
    "#c7e9b4", // Light Green
    "#fff0b5", // Light Yellow
    "#ffb5b5", // Light Red
    "#d1b5ff", // Light Purple
    "#b5fff0", // Cyan
    "#ffe0b5", // Orange
    "#e0e0e0", // Light Gray
  ];
  const [roomColor, setRoomColor] = useState(predefinedColors[0]);


  const onSubmitAddRoom = async (e) => {
    e.preventDefault();
    const roomData = {
      room_name: roomName,
      room_color: roomColor,
    };
    roomRequest.execute(addRoom, roomData, userId);
  };

  return (
    <div className="add-room-container">
      <h2 className="form-title">Add New Room</h2>
      <form onSubmit={onSubmitAddRoom}>
        <div className="form-group">
          <label htmlFor="roomName">Room Name</label>
          <InputField
            type="n-name"
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
          <Button type="submit" loading={roomRequest.loading}>
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AddRoom;
