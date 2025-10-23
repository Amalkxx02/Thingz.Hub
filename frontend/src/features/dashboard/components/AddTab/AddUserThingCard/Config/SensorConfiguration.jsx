import { useState } from "react";
import InputField from "../../../common/inputField/InputField";

const SensorConfiguration = ({
  submitThingCard,
  onSensorName,
  onSensorUnit,
  onSensorMin,
  onSensorMax,
  onSensorIsBool,
  onSensorGraph,
  ons,
}) => {
  return (
    <div className="flex flex-col gap-5">
      <form id="userForm" onSubmit={submitThingCard}>
        <div className="flex gap-5">
          <div className="w-9/12">
            <InputField
              type="custom"
              placeholder="Sensor Name"
              onChange={onSensorName}
            />
          </div>
          <div className="w-3/12">
            <InputField type="custom" placeholder="Unit" onChange={onSensorUnit} />
          </div>
        </div>

        <div className="flex">
          <div className="flex w-4/12">
            <div className="flex p-2 items-center border-2 border-[#72a4ff] rounded-[.5rem] gap-2">
              Boolean
              <InputField type="checkbox" onChange={onSensorIsBool}/>
            </div>
          </div>
          <div className="flex w-8/12 gap-2">
            <InputField type="number" placeholder="Min" onChange={onSensorMin}/>
            <InputField type="number" placeholder="Max" onChange={onSensorMax}/>
          </div>
        </div>

        <div className="flex w-4/12">
          <div className="flex items-center gap-2">
            Graph
            <InputField type="checkbox" onChange={onSensorGraph}/>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SensorConfiguration;
