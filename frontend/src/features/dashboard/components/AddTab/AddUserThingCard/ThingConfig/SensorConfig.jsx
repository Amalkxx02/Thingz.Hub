import InputText from "../../../../../../shared/components/Input/InputText";
import InputCheck from "../../../../../../shared/components/Input/InputCheck";
import Button from "../../../../../../shared/components/Button/Button";

import useSensorConfig from "./useSensorConfig";

const SensorConfig = ({ setWindow, thingDetail }) => {
  const { onSubmitConfig, config, setConfig, loading } =
    useSensorConfig(thingDetail);

  return (
    <form className="flex w-full flex-col gap-6" onSubmit={onSubmitConfig}>
      <div className="flex gap-4">
        <div className="flex w-2/3 flex-col gap-1">
          <label>Thing Name</label>
          <InputText
            placeholder={thingDetail.thing_name}
            onChange={(value) =>
              setConfig((prev) => ({
                ...prev,
                thingName: value || thingDetail.thing_name,
              }))
            }
          />
        </div>
        <div className="flex w-1/3 flex-col gap-1">
          <label>Unit</label>
          <InputText
            required={config.isBool ? false : true}
            placeholder="Unit"
            onChange={(value) =>
              setConfig((prev) => ({ ...prev, thingUnit: value }))
            }
          />
        </div>
      </div>
      <div className="flex gap-6">
        <InputCheck
          label="Boolean"
          onCheck={(value) => setConfig((prev) => ({ ...prev, isBool: value }))}
        />
        <InputCheck
          label="Graph"
          onCheck={(value) =>
            setConfig((prev) => ({ ...prev, enableGraph: value }))
          }
        />
      </div>
      <div className="flex gap-6">
        <div className="w-1/3">
          <InputText type="number" placeholder="Minimum Range" />
        </div>
        <div className="w-1/3">
          <InputText type="number" placeholder="Maximum Range" />
        </div>
      </div>

      <div className="flex gap-10">
        <Button onClick={() => setWindow("selector")}>Back</Button>
        <Button type="submit" isLoading={loading} isDisabled={loading}>
          Add
        </Button>
      </div>
    </form>
  );
};

export default SensorConfig;
