import { useEffect, useState } from "react";
import { getSensorList, getActuatorList } from "../../../../apis/thingCardApi";
import "../AddThingCard.css";

const Selection = ({ selection, setSelection, setThingId, userId }) => {
  const {selectedThingType, selectedDeviceName, selectedThingName} = selection;

  const [availableSensors, setAvailableSensors] = useState([]);
  const [availableActuators, setAvailableActuators] = useState([]);

  const availableDevices =
    selectedThingType === "Sensors"
      ? availableSensors
      : selectedThingType === "Actuators"
      ? availableActuators
      : [];

  const selectedDeviceDetails = availableDevices.find(
    (device) => device.device_name === selectedDeviceName
  );

  const availableThingz =
    selectedThingType === "Sensors"
      ? selectedDeviceDetails?.sensors
      : selectedThingType === "Actuators"
      ? selectedDeviceDetails?.actuators
      : [];

  useEffect(() => {
    fetchAvailableSensors();
    //fetchAvailableActuators();
  }, []);

  const fetchAvailableSensors = async () => {
    try {
      const sensors = await getSensorList(userId);
      setAvailableSensors(sensors);
    } catch (error) {
      console.error("Error fetching sensor list:", error);
    }
  };

  const fetchAvailableActuators = async () => {
    try {
      const actuators = await getActuatorList(userId);
      setAvailableActuators(actuators);
    } catch (error) {
      console.error("Error fetching actuator list:", error);
    }
  };

  return (
    <div className="card-form-container">
      <div className="form-section">
        <h3>Type Selection</h3>
        <select
          value={selectedThingType}
          onChange={(e) => {
            setSelection({
              ...selection,
              selectedThingType: e.target.value,
              selectedDeviceName: "",
              selectedThingName: "",
            });
          }}
        >
          <option value="">Select Type</option>
          <option value="Sensors">Sensor</option>
          <option value="Actuators">Actuator</option>
        </select>
      </div>

      {selectedThingType && availableDevices?.length > 0 && (
        <div className="form-section">
          <h3>Device Selection</h3>
          <select
            value={selectedDeviceName}
            onChange={(e) => {
              setSelection({
                ...selection,
                selectedDeviceName: e.target.value,
                selectedThingName: "",
              });
            }}
          >
            <option value="">Select Device</option>
            {availableDevices.map((device) => (
              <option key={device.device_name} value={device.device_name}>
                {device.device_name}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedDeviceName && availableThingz?.length > 0 && (
        <div className="form-section">
          <h3>Thing Selection</h3>
          <select
            value={selectedThingName}
            onChange={(e) => {
              const selectedThing = e.target.value;
              setSelection({
                ...selection,
                selectedThingName: selectedThing,
              });
              const thing = availableThingz.find((thing) => thing.sensor_name === selectedThing);
                setThingId(thing.sensor_id)

            }}
          >
            <option value="">Select Thing</option>
            {availableThingz.map((thing) => (
              <option key={thing.sensor_id} value={thing.sensor_name}>
                {thing.sensor_name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Selection;
