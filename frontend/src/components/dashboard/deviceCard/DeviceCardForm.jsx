import React, { useState } from 'react';
import './DeviceCardForm.css'

const DeviceCardForm = ({ onSave, onCancel, devices }) => {
  const [selectedDevice, setSelectedDevice] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSensor, setSelectedSensor] = useState('');
  const [selectedActuator, setSelectedActuator] = useState('');

  // Sensor states
  const [minThreshold, setMinThreshold] = useState('');
  const [maxThreshold, setMaxThreshold] = useState('');
  const [enableGraph, setEnableGraph] = useState(false);
  const [isBooleanSensor, setIsBooleanSensor] = useState(false);
  const [includeLastOn, setIncludeLastOn] = useState(false);

  // Actuator states
  const [controlType, setControlType] = useState('toggle');
  const [defaultState, setDefaultState] = useState('off');
  const [autoOff, setAutoOff] = useState(0);
  const [maxRuntime, setMaxRuntime] = useState(0);

  // Mock lookups
  const getSensorsForDevice = (device) => {
    const mockSensors = {
      'Device 1': ['Temperature', 'Humidity', 'Motion'],
      'Device 2': ['Pressure', 'Light'],
      'Device 3': ['Door State'],
    };
    return mockSensors[device] || [];
  };

  const getActuatorForDevice = (device) => {
    const mockActuator= {
      'Device 1': ['Motor', 'Water Pump', 'Light'],
      'Device 2': ['Light1', 'Light2'],
      'Device 3': ['Curtain'],
    };
    return mockActuator[device] || [];
  };

  const handleSave = () => {
    let config = {
      device: selectedDevice,
      type: selectedType,
    }; 
    if (selectedDevice != "" && selectedType === "Sensors" && selectedSensor !="") {
      config = {
        ...config,
        sensor: selectedSensor,
        thresholds: { min: minThreshold, max: maxThreshold },
        enableGraph,
        isBooleanSensor,
        includeLastOn,
      };
      onSave(config);
    }

    if (selectedDevice != "" && selectedType === "Actuators" && selectedActuator !="") {
      config = {
        ...config,
        actuator: selectedActuator,
        controlType,
        defaultState,
        autoOff,
        maxRuntime,
      };
      onSave(config);
    }

  };

  const handleClear = () => {
    setSelectedDevice('');
    setSelectedType('');
    setSelectedSensor('');
    setSelectedActuator('');
    setMinThreshold('');
    setMaxThreshold('');
    setEnableGraph(false);
    setIsBooleanSensor(false);
    setIncludeLastOn(false);
    setControlType('toggle');
    setDefaultState('off');
    setAutoOff(0);
    setMaxRuntime(0);
  };

  return (
    <div className="card-form-container">
      <h2>Thing Configuration</h2>

      {/* Device Selection */}
      <div className="form-section">
        <h3>Device Selection</h3>
        <select value={selectedDevice} onChange={(e) => setSelectedDevice(e.target.value)}>
          <option value="">Select Device</option>
          {devices.map(device => (
            <option key={device} value={device}>{device}</option>
          ))}
        </select>
      </div>

      {/* Type Selection */}
      <div className="form-section">
        <h3>Thingz Selection</h3>
        <select value={selectedType} onChange={(e) => {
          setSelectedType(e.target.value);
          setSelectedSensor('');
          setSelectedActuator('');
        }}>
          <option value="">Select Type</option>
          <option value="Sensors">Sensor</option>
          <option value="Actuators">Actuator</option>
        </select>
      </div>

      {/* Sensor Config */}
      {selectedDevice && selectedType==="Sensors" && (
        <div className="form-section">
          <h3>Sensor Selection</h3>
          <select value={selectedSensor} onChange={(e) => setSelectedSensor(e.target.value)}>
            <option value="">Select Sensor</option>
            {getSensorsForDevice(selectedDevice).map(sensor => (
              <option key={sensor} value={sensor}>{sensor}</option>
            ))}
          </select>
        </div>
      )}

      {selectedSensor && (
        <>
          <div className="form-section">
            <h3>Status Thresholds / Range</h3>
            <div className="input-group">
              <label>Min/Normal:</label>
              <input type="number" value={minThreshold} onChange={(e) => setMinThreshold(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Max/Critical:</label>
              <input type="number" value={maxThreshold} onChange={(e) => setMaxThreshold(e.target.value)} />
            </div>
          </div>

          <div className="form-section">
            <h3>Graph Option</h3>
            <div className="toggle-group">
              <label>Enable Graph?</label>
              <input type="checkbox" checked={enableGraph} onChange={(e) => setEnableGraph(e.target.checked)} />
            </div>
          </div>

          <div className="form-section">
            <h3>Boolean Sensor?</h3>
            <div className="toggle-group">
              <label>Is Boolean Sensor?</label>
              <input type="checkbox" checked={isBooleanSensor} onChange={(e) => setIsBooleanSensor(e.target.checked)} />
            </div>
            {isBooleanSensor && (
              <div className="toggle-group nested">
                <label>Include Last On Timestamp?</label>
                <input type="checkbox" checked={includeLastOn} onChange={(e) => setIncludeLastOn(e.target.checked)} />
              </div>
            )}
          </div>
        </>
      )}

      {/* Actuator Config */}
      {selectedDevice && selectedType==="Actuators" && (
        <div className="form-section">
          <h3>Actuator Selection</h3>
          <select value={selectedActuator} onChange={(e) => setSelectedActuator(e.target.value)}>
            <option value="">Select Actuator</option>
            {getActuatorForDevice(selectedDevice).map(actuator => (
              <option key={actuator} value={actuator}>{actuator}</option>
            ))}
          </select>
        </div>
      )}

      {selectedActuator && (
        <>
          <div className="form-section">
            <h3>Actuator Settings</h3>
            <div className="input-group">
              <label>Control Type:</label>
              <select value={controlType} onChange={(e) => setControlType(e.target.value)}>
                <option value="toggle">On/Off</option>
                <option value="range">Range (0–100)</option>
                <option value="preset">Preset Modes</option>
              </select>
            </div>

            <div className="input-group">
              <label>Default State:</label>
              <select value={defaultState} onChange={(e) => setDefaultState(e.target.value)}>
                <option value="off">OFF</option>
                <option value="on">ON</option>
              </select>
            </div>

            <div className="input-group">
              <label>Auto-Off Timer (seconds):</label>
              <input type="number" value={autoOff} onChange={(e) => setAutoOff(e.target.value)} />
            </div>

            <div className="input-group">
              <label>Max Runtime (minutes):</label>
              <input type="number" value={maxRuntime} onChange={(e) => setMaxRuntime(e.target.value)} />
            </div>
          </div>
        </>
      )}

      {/* Actions */}
      <div className="form-actions">
        <button className="save-button" onClick={handleSave}>Save</button>
        <button className="clear-button" onClick={handleClear}>Clear</button>
        <button className="cancel-button" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default DeviceCardForm;
