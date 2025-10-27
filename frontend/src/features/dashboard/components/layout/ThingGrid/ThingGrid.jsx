import useThingGrid from "./useThingGrid";
import dataHandleWS from "../../../apis/websocket.js";
import { useEffect } from "react";

const ThingGrid = () => {
  const { fetchThingCard } = useThingGrid();
  const liveData = dataHandleWS();
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2">
      {fetchThingCard &&
        fetchThingCard.map((thing) => (
          <div
            key={thing.thing_id}
            className={`flex max-w-sm flex-col p-5 shadow ${
              thing.config.enableGraph ? "" : ""
            } `}
          >
            <div className="pb-1">{thing.config.thingName}</div>
            <div className="pb-1 font-light text-gray-400">
              {thing.config.deviceName}
            </div>
            <div className="flex">
              <div className="text-3xl">{liveData[thing.thing_id]}</div>
              <div className="flex items-end pl-2">
                {thing.config.thingUnit}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ThingGrid;
