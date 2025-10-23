import "../AddUserThingCard.css";

/**
 * ThingSelector Component
 * -----------------------
 * A React functional component for rendering a multi-level selection form:
 * 1. Device selection
 * 2. Thing type selection (depends on selected device)
 * 3. Thing selection (depends on selected device and type)
 *
 * Props:
 *  - selectionState: Object
 *      Holds the current selection state:
 *        - selectedDeviceName: string
 *        - selectedThingType: string
 *        - selectedThingName: string
 *  - deviceList: Array
 *      List of all available devices for selection. Each device should have:
 *        - device_name: string
 *        - thingz: object mapping types to arrays of things
 *  - selectedDeviceData: Object
 *      The data of the currently selected device, containing its `thingz` object
 *  - onDeviceChange: function
 *      Callback triggered when the user selects a device
 *  - onThingTypeChange: function
 *      Callback triggered when the user selects a thing type
 *  - onThingChange: function
 *      Callback triggered when the user selects a thing
 *
 * Structure:
 *  - Device Selection Dropdown
 *  - Thing Type Selection Dropdown (conditional on selected device)
 *  - Thing Selection Dropdown (conditional on selected device and type)
 */
const ThingSelector = ({
  selectionState,
  deviceList,
  selectedDeviceData,
  onDeviceChange,
  onThingTypeChange,
  onThingChange,
}) => {
  // Destructure the current selection state
  const { selectedDeviceName, selectedThingType, selectedThingName } =
    selectionState;

  return (
    <div className="card-form-container">
      {/* Device Selection */}
      <div className="form-section">
        <h3>Device Selection</h3>
        <select value={selectedDeviceName} onChange={onDeviceChange}>
          <option value="">Select Device</option>
          {deviceList &&
            deviceList.map((device) => (
              <option key={device.device_name} value={device.device_name}>
                {device.device_name}
              </option>
            ))}
        </select>
      </div>

      {/* Thing Type Selection - only shown if a device is selected */}
      {selectedDeviceName && (
        <div className="form-section">
          <h3>Type Selection</h3>
          <select value={selectedThingType} onChange={onThingTypeChange}>
            <option value="">Select Type</option>
            {Object.keys(selectedDeviceData.thingz)//thingz is object key name from backend (thing{sensor actuator})
              .filter((key) => selectedDeviceData.thingz[key]) // only show non-empty types
              .map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
          </select>
        </div>
      )}

      {/* Thing Selection - only shown if a device and type are selected */}
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
