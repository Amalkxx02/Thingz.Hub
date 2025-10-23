import { useState, useEffect } from "react";
import { getThingz } from "../../../../apis/userThingCardApi";

export default function useThingSelector(userId) {
  const [selection, setSelection] = useState({
    selectedDeviceName: "",
    selectedThingType: "",
    selectedThingName: "",
  });
  const [deviceData, setDeviceData] = useState([]);

  useEffect(() => {
    const fetchThingzData = async () => {
      try {
        const data = await getThingz(userId);
        setDeviceData(data);
      } catch (error) {
        console.error("Error fetching device list:", error);
      }
    };
    fetchThingzData();
  }, [userId]);

  const selectedDeviceObj = deviceData.find(
    (device) => device.device_name === selection.selectedDeviceName
  );

  const onDeviceSelect = (e) => {
    setSelection({
      selectedDeviceName: e.target.value,
      selectedThingType: "",
      selectedThingName: "",
    });
  };

  const onThingTypeSelect = (e) => {
    setSelection({
      ...selection,
      selectedThingType: e.target.value,
      selectedThingName: "",
    });
  };

  const onThingSelect = (e) => {
    setSelection({
      ...selection,
      selectedThingName: e.target.value,
    });
  };

  const selectedThing =
    selectedDeviceObj &&
    selection.selectedThingType &&
    selection.selectedThingName
      ? selectedDeviceObj.thingz[selection.selectedThingType].find(
          (thing) => thing.thing_name === selection.selectedThingName
        )
      : null;

  return {
    selectionState: selection,
    deviceList: deviceData,
    selectedDeviceData: selectedDeviceObj,
    selectedThingObject: selectedThing,
    onDeviceChange: onDeviceSelect,
    onThingTypeChange: onThingTypeSelect,
    onThingChange: onThingSelect,
  };
}
