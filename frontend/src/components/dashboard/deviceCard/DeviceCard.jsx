import React, { useState } from 'react';

import './DeviceCard.css'

const DeviceCardForm = ({ onSave, onCancel, devices }) => {
  const [selectedDevice, setSelectedDevice] = useState('');
  const [selectedSensor, setSelectedSensor] = useState('');
  const [minThreshold, setMinThreshold] = useState('');
  const [maxThreshold, setMaxThreshold] = useState('');
  const [enableGraph, setEnableGraph] = useState(false);
  const [isBooleanSensor, setIsBooleanSensor] = useState(false);
  const [includeLastOn, setIncludeLastOn] = useState(false);

  const getSensorsForDevice = (device) => {
    // This is a mock function. In a real app, this would be an API call or a lookup.
    const mockSensors = {
      'Device 1': ['Temperature', 'Humidity', 'Motion'],
      'Device 2': ['Pressure', 'Light'],
      'Device 3': ['Door State'],
    };
    return mockSensors[device] || [];
  };

  const handleSave = () => {
    const config = {
      device: selectedDevice,
      sensor: selectedSensor,
      thresholds: {
        min: minThreshold,
        max: maxThreshold,
      },
      enableGraph,
      isBooleanSensor,
      includeLastOn,
    };
    onSave(config);
  };

  return (
    <div className="card-form-container">
      <h2>Device Card Configuration</h2>
      <div className="form-section">
        <h3>Device Selection</h3>
        <select value={selectedDevice} onChange={(e) => {
          setSelectedDevice(e.target.value);
          setSelectedSensor(''); // Reset sensor selection
        }}>
          <option value="">Select Device</option>
          {devices.map(device => (
            <option key={device} value={device}>{device}</option>
          ))}
        </select>
      </div>

      {selectedDevice && (
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
              <input
                type="checkbox"
                checked={enableGraph}
                onChange={(e) => setEnableGraph(e.target.checked)}
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Boolean Sensor?</h3>
            <div className="toggle-group">
              <label>Is Boolean Sensor?</label>
              <input
                type="checkbox"
                checked={isBooleanSensor}
                onChange={(e) => setIsBooleanSensor(e.target.checked)}
              />
            </div>
            {isBooleanSensor && (
              <div className="toggle-group nested">
                <label>Include Last On Timestamp?</label>
                <input
                  type="checkbox"
                  checked={includeLastOn}
                  onChange={(e) => setIncludeLastOn(e.target.checked)}
                />
              </div>
            )}
          </div>
        </>
      )}

      <div className="form-actions">
        <button className="save-button" onClick={handleSave}>Save</button>
        <button className="cancel-button" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default DeviceCardForm;