import useAddThingCard from "./useAddThingCard";
import ThingSelector from "./ThingSelection/ThingSelector";
import SensorConfig from "./ThingConfig/SensorConfig";
import ActuatorConfig from "./ThingConfig/ActuatorConfig";

const AddThingCard = () => {
 const { ...props } = useAddThingCard();
  return (
    <div className="flex flex-col w-full">
      <h2 className="text-center text-3xl font-bold">Add New Thing</h2>
      {props.window === "selector" && <ThingSelector {...props} />}
      {props.window === "sensors" && <SensorConfig {...props} />}
      {props.window === "actuators" && <ActuatorConfig {...props} />}
    </div>
  );
};

export default AddThingCard;
