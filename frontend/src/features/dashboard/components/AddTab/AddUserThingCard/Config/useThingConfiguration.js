import { useState, useEffect } from "react";

export default function useThingConfiguration() {
  const [sensorConfig, setSensorConfig] = useState({
    selectedSensorName: "",
    selectedUnit: "",
    selectedSensorMin: "",
    selectedSensorMax: "",
    isBool: false,
    enableGraph: false,
  });
  const onSensorName = (value) => {
    setSensorConfig({
      ...sensorConfig,
      selectedSensorName: value,
    });
  };

  const onSensorUnit = (value) => {
    setSensorConfig({
      ...sensorConfig,
      selectedUnit: value,
    });
  };
  const onSensorMin = (value) => {
    setSensorConfig({
      ...sensorConfig,
      selectedSensorMin: value,
    });
  };
  const onSensorMax = (value) => {
    setSensorConfig({
      ...sensorConfig,
      selectedSensorMax: value,
    });
  };
  const onSensorIsBool = (value) => {
    setSensorConfig({
      ...sensorConfig,
      isBool: value,
    });
  };
  const onSensorGraph = (value) => {
    setSensorConfig({
      ...sensorConfig,
      enableGraph: value,
    });
  };

  return {
    onSensorName,
    onSensorUnit,
    onSensorMin,
    onSensorMax,
    onSensorIsBool,
    onSensorGraph,
    sensorConfig,
  };
}
