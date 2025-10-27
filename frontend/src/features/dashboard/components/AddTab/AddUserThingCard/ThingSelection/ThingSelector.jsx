import useThingSelector from "./useThingSelector";
import Select from "../../../../../../shared/components/Select/Select";
import Button from "../../../../../../shared/components/Button/Button";
const ThingSelector = ({setWindow,setThingDetail}) => {
  const {
    selection,
    setSelection,

    disabled,

    deviceNames,
    thingTypes,
    thingNames,
  } = useThingSelector(setThingDetail);

  const { deviceName, thingType, thingName } = selection;
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex flex-col gap-1">
        <label>Devices</label>
        <Select
          value={deviceName}
          options={deviceNames}
          onChange={(value) =>
            setSelection((prev) => ({
              ...prev,
              deviceName: value,
              thingType: "",
              thingName: "",
            }))
          }
        />
      </div>
      <div className="flex flex-col gap-1">
        <label>Thing types</label>
        <Select
          value={thingType}
          options={thingTypes}
          onChange={(value) =>
            setSelection((prev) => ({
              ...prev,
              thingType: value,
              thingName: "",
            }))
          }
        />
      </div>
      <div className="flex flex-col gap-1">
        <label>Things</label>
        <Select
          value={thingName}
          options={thingNames}
          onChange={(value) =>
            setSelection((prev) => ({
              ...prev,
              thingName: value,
            }))
          }
        />
      </div>
      <div className="flex">
        <Button onClick={()=>setWindow(thingType||"selector")} isDisabled={disabled}>
          Continue
        </Button>
      </div>
    </div>
  );
};
export default ThingSelector;
