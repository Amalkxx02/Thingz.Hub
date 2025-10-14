import "../AddUserThingCard.css";

const ThingSelector = ({
  selectionState,
  deviceList,
  selectedDeviceData,
  onDeviceChange,
  onThingTypeChange,
  onThingChange,
}) => {
  const { selectedDeviceName, selectedThingType, selectedThingName } = selectionState;
  
  return (
    <div className="card-form-container">
      <div className="form-section">
        <h3>Device Selection</h3>
        <select value={selectedDeviceName} onChange={onDeviceChange}>
          <option value="">Select Device</option>
          {deviceList.map((device) => (
            <option key={device.device_name} value={device.device_name}>
              {device.device_name}
            </option>
          ))}
        </select>
      </div>

      {selectedDeviceName && (
        <div className="form-section">
          <h3>Type Selection</h3>
          <select value={selectedThingType} onChange={onThingTypeChange}>
            <option value="">Select Type</option>
            {Object.keys(selectedDeviceData.thingz)
              .filter((key) => selectedDeviceData.thingz[key])
              .map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
          </select>
        </div>
      )}

      {selectedDeviceName && selectedThingType && (
        <div className="form-section">
          <h3>Thing Selection</h3>
          <select value={selectedThingName} onChange={onThingChange}>
            <option value="">Select Thing</option>
            {selectedDeviceData.thingz[selectedThingType].map((thing) => (
              <option key={thing.thing_id} value={thing.thing_name}>
                {thing.thing_name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default ThingSelector;