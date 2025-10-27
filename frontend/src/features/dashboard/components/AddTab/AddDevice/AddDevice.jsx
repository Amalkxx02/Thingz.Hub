import InputText from "../../../../../shared/components/Input/InputText";
import Button from "../../../../../shared/components/Button/Button";
import useAddDevice from "./useAddDevice";

const AddDevice = () => {
  const { uuid, deviceName, loading, setDeviceName, onSubmitAddDevice } =
    useAddDevice();

  return (
    <div className="w-full">
      <form className="flex flex-col gap-6" onSubmit={onSubmitAddDevice}>
        <h2 className="text-center text-3xl font-bold">Add New Device </h2>
        <div className="flex flex-col gap-1">
          <label></label>
          <InputText
            type="custom"
            label="Device Name"
            value={deviceName}
            placeholder="Device Name"
            onChange={setDeviceName}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Device UUID</label>
          <div className="border-1 border-dashed bg-gray-50 p-3">
            <p className="uuid-text">{uuid}</p>
          </div>
          <p className="text-xs text-gray-500">
            Copy this UUID to the device JSON payload.
          </p>
        </div>

        <div className="flex gap-10">
          <Button type="submit" isLoading={loading}>
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AddDevice;
