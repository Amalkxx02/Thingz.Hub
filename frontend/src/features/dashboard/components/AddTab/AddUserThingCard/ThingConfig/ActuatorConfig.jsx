import InputText from "../../../../../../shared/components/Input/InputText";
import Button from "../../../../../../shared/components/Button/Button";
const ActuatorConfig = () => {
  return (
    <form>
      <div className="flex flex-col gap-1">
        <label>Device Name</label>
        <InputText
          type="custom"
          placeholder="Thing Name"
        />
      </div>

      <div className="flex gap-10">
        <Button onClick={() => setTab("")}>Close</Button>
        <Button type="submit" isLoading={loading}>
          Add
        </Button>
      </div>
    </form>
  );
};

export default ActuatorConfig;
