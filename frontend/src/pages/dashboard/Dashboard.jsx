import React, { useEffect, useState } from 'react';
import Header from '../../components/dashboard/Header.jsx';
import Sidebar from '../../components/dashboard/Sidebar.jsx';
import DeviceCardForm from '../../components/dashboard/deviceCard/DeviceCardForm.jsx'
import { fetchSensor } from '../../api/thingzSensor.js';


import './Dashboard.css'; // Importing the CSS file

const Dashboard = () => {
  const [showDiv, setShowDiv] = useState(false)
  const [sensors, setSensors] = useState([])

  useEffect(() => {
    fetchSensor()
      .then((data) => setSensors(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="dashboard-container">
      <Sidebar setShowDiv={setShowDiv} />
      {showDiv && (
        <div
          className="overlay"
          style={{ display: 'flex' }}
        >
          <DeviceCardForm
            onSave={(config) => console.log(config)}
            onCancel={() => setShowDiv(false)}
            devices={['Device 1', 'Device 2', 'Device 3']}
          />
        </div>

      )}
      <div className="main-content">
        <Header />
        <div className="grid-container">
          <div className="device-grid">
            {sensors.map((sensor) => (
              <div
                key={sensor.sensor_id}
                className="device-card">
                {Object.entries(sensor.data).map(([key, value]) =>(
                  <p key={key}>
                    {key}:{value}
                  </p>
                ))}
              </div>
            ))}
            <div className="device-card "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;