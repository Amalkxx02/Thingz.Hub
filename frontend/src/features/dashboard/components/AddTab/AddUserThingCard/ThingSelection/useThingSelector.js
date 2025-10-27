import { useState, useEffect } from "react";
import { getThings } from "../../../../apis/thingCardApi";
import useFetch from "../../../../../../shared/hooks/useFetch";

export default function useThingSelector(setThingDetail) {
  const { data: fetchDevices } = useFetch(getThings);

  const [selection, setSelection] = useState({
    deviceName: "",
    thingType: "",
    thingName: "",
  });

  const device = fetchDevices?.find(
    (d) => d.device_name === selection.deviceName,
  );

  const deviceNames = fetchDevices?.map((d) => d.device_name);

  const thingTypes =
    device &&
    (Object.keys(device.things) || []).filter((k) => device.things[k] !== null);

  const thingNames = device?.things[selection.thingType]?.map(
    (t) => t.thing_name,
  );

  const thingId =
    device?.things[selection.thingType]?.find(
      (t) => t.thing_name === selection.thingName,
    )?.thing_id ?? "";

  useEffect(() => {
    setThingDetail({
      device_name:selection.deviceName,
      thing_name: selection.thingName,
      thing_id: thingId,
    })
  }, [thingId]);

  const disabled = !Object.values(selection).every(Boolean);

  return {
    selection,
    setSelection,

    disabled,

    deviceNames,
    thingTypes,
    thingNames,
    thingId,
  };
}
