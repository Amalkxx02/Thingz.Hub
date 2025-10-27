import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { addDevice } from "../../../apis/deviceApi";
import useApiSubmission from "../../../../../shared/hooks/useApiSubmission";

export default function useAddDevice() {
  const [uuid] = useState(uuidv4());
  const [deviceName, setDeviceName] = useState("");
  const { success, execute, loading, error } = useApiSubmission();

  const onSubmitAddDevice = async (e) => {
    e.preventDefault();
    const deviceData = {
      device_id: uuid,
      device_name: deviceName,
    };
    await execute(addDevice,deviceData);
  };

  return{
    uuid,
    deviceName,
    loading,
    setDeviceName,
    onSubmitAddDevice
  };
}
