import Button from "../../common/Button/Button";
import ThingSelector from "./ThingSelection/ThingSelector";
import SensorConfiguration from "./Config/SensorConfiguration";
import ActuatorConfiguration from "./Config/ActuatorConfiguration";
import useThingManagement from "./useThingManagement";
import "./AddUserThingCard.css";

const AddUserThingCard = ({ setTab, userId }) => {
  const thingManagement = useThingManagement(setTab, userId);
  const {
    thingManagementState,
    getComponentToRender,
    handleCloseCard,
    handleContinueOrAdd,
    getActionButtonType,
    getActionButtonText,
    isThingSelected,
    loading
  } = thingManagement;


  return (
    <div className="card-form-container">
      <h2>Add new Thing</h2>
      {getComponentToRender() === "selector" && (
        <ThingSelector {...thingManagement} />
      )}
      {getComponentToRender() === "sensorsConfig" && (
        <SensorConfiguration {...thingManagement} />
      )}
      {getComponentToRender() === "actuatorConfig" && <ActuatorConfiguration />}
      <div className="form-actions">
        <Button onClick={handleCloseCard}>Close</Button>
        <Button
          type={getActionButtonType()}
          form="userForm"
          onClick={handleContinueOrAdd}
          isLoading={loading}
          isDisabled={!isThingSelected}
        >
          {getActionButtonText()}
        </Button>
      </div>
    </div>
  );
};

export default AddUserThingCard;
