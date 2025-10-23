import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addDevice } from "../../../apis/deviceApi";
import InputField from "../../common/inputField/InputField";
import Button from "../../common/Button/Button";
import useApiSubmission from "../../hooks/useApiSubmission";
import "./AddDevice.css";

const AddDevice = ({ setTab, userId }) => {
  const [uuid] = useState(uuidv4());
  const [deviceName, setDeviceName] = useState("");
  const { success, execute, loading, error } = useApiSubmission();

  const onSubmitAddDevice = async (e) => {
    e.preventDefault();
    const deviceData = {
      device_id: uuid,
      device_name: deviceName,
    };
    await execute(addDevice, userId, deviceData);
  };

  return (
    <div className="uuid-container p-8 w-full max-w-lg rounded-2xl">
      <h2 className="uuid-heading">Add New Device </h2>
      <form onSubmit={onSubmitAddDevice}>
        <div className="form-group">
          <label htmlFor="deviceName">Device Name</label>
          <InputField
            type="custom"
            value={deviceName}
            placeholder="e.g., Living Room Thermostat"
            onChange={setDeviceName}
          />
          <label htmlFor="deviceId">Device ID</label>
          <div className="uuid-text-box">
            <p className="uuid-text">{uuid}</p>
          </div>
        </div>

        <p className="pl-5 mb-6 text-xs text-gray-500">
          Copy this UUID to the device JSON payload.
        </p>

        <div className="uuid-buttons">
          <Button onClick={() => setTab("")}>Close</Button>
          <Button type="submit" isLoading={loading}>
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AddDevice;
