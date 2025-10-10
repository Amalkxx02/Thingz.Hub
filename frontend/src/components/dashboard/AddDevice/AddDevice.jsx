import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addDevice } from "../../../apis/deviceApi";
import InputField from "../../common/inputField/InputField";
import Button from "../../common/Button/Button";
import useApiSubmission from "../../hooks/useApiSubmission";
import "./AddDevice.css";

const AddDevice = ({setTab, userId}) => {
  const deviceRequest = useApiSubmission();
  const [uuid] = useState(uuidv4());
  const [deviceName, setDeviceName] = useState("");

  const onSubmitAddDevice = async (e) => {
    e.preventDefault();
    const deviceData = {
      device_id: uuid,
      device_name: deviceName,
    };
    deviceRequest.execute(addDevice, deviceData, userId);
  };

  return (
    <div className="uuid-container">
      <h2 className="uuid-heading">Add New Device </h2>
      <form onSubmit={onSubmitAddDevice}>
        <div className="form-group">
          <label htmlFor="deviceName">Device Name</label>
          <InputField
            type="n-name"
            value={deviceName}
            placeholder="e.g., Living Room Thermostat"
            onChange={setDeviceName}
          />
          <label htmlFor="deviceId">Device ID</label>
          <div className="uuid-text-box">
            <p className="uuid-text">{uuid}</p>
          </div>
        </div>

        <p className="uuid-prompt">
          Copy this UUID to the device JSON payload.
        </p>

        <div className="uuid-buttons">
          <button className="btn close-btn" onClick={()=>setTab('')}>Close</button>
          <Button type="submit" loading={deviceRequest.loading}>
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AddDevice;
