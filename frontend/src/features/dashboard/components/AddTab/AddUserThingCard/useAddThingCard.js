import { useState } from "react";

export default function useAddThingCard() {
  const [window, setWindow] = useState("selector");
  const [thingDetail, setThingDetail] = useState({
    device_name:"",
    thing_name: "",
    thing_id: "",
  });
  return {
    window,
    setWindow,
    thingDetail,
    setThingDetail,
  };
}
