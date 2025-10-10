import { useState } from "react";
import InputField from "../../../common/inputField/InputField";
import "../AddThingCard.css";

const sensorConfig = ({ setThingConfig }) => {
  const [config, setConfig] = useState({
    sensorName: "",
    sensorMin: "",
    sensorMax: "",
    isBool: false,
  });

  setThingConfig(config);
  return (
    <div>
      <InputField
        type="n-name"
        value={config.sensorName}
        placeholder="e.g., Living Room Thermostat"
        onChange={(val) =>
          setConfig({
            ...config,
            sensorName: val,
          })
        }
      />
    </div>
  );
};

export default sensorConfig;
