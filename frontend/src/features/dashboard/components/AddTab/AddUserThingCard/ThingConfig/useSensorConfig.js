import { useState, useEffect } from "react";

import { addThingCard } from "../../../../apis/thingCardApi";
import useApiSubmission from "../../../../../../shared/hooks/useApiSubmission";

export default function useSensorConfig(thingDetail) {
  const { loading, execute } = useApiSubmission();

  const [config,setConfig] = useState({
    deviceName:thingDetail.device_name,
    thingName:thingDetail.thing_name,
    thingUnit : "",
    isBool:false,
    enableGraph:false


  })
  console.log(config)
  const onSubmitConfig = async (e) => {
    e.preventDefault();
    const data = {
      thing_id:thingDetail.thing_id,
      thing_config:config
    
    };
    console.log(data)

    await execute(addThingCard, data);
  };
  return { onSubmitConfig,config,setConfig,loading };
}
