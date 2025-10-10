import { useState } from "react";
import Selection from "./Selection/Selection";
import SensorConfig from "./Config/SensorConfig";
import Button from "../../common/Button/Button";
import { addThingzCard } from "../../../apis/thingCardApi";
import useApiSubmission from "../../hooks/useApiSubmission";
import "./AddThingCard.css";

const AddThingCard = ({ setTab, userId }) => {
  const [showConfig, setShowConfig] = useState(false);
  const [thingId, setThingId] = useState(null);
  const [selection, setSelection] = useState({
    selectedThingType: "",
    selectedDeviceName: "",
    selectedThingName: "",
  });
  const [thingConfig, setThingConfig] = useState({});
  const thingCard = useApiSubmission();

  const onThingCardSubmit = async () => {
    const thingData = {
      thing_id: thingId,
      thing_config: thingConfig,
    };
    await thingCard.execute(addThingzCard, thingData, userId);
  };
  const isDisabled =
    !selection.selectedThingType ||
    !selection.selectedDeviceName ||
    !selection.selectedThingName;

  return (
    <div className="card-form-container">
      <h2>Add new Thing</h2>
      {!showConfig && (
        <Selection
          selection={selection}
          setSelection={setSelection}
          setThingId={setThingId}
          userId={userId}
        />
      )}

      {showConfig && selection.selectedThingType === "Sensors" ? (
        <SensorConfig
          selection={selection}
          setThingConfig={setThingConfig}
          userId={userId}
        />
      ) : selection.selectedThingType === "Actuator" ? (
        <ActuatorConfig thingId={thingId} />
      ) : null}

      <div className="form-actions">
        <Button
          type="button"
          onClick={() => {
            setTab("");
            setShowConfig(false);
          }}
        >
          Close
        </Button>
        <Button
          type="button"
          disabled={isDisabled}
          onClick={() => {
            !showConfig ? setShowConfig(true) : onThingCardSubmit();
          }}
          loading={thingCard.loading}
        >
          {!showConfig ? "Next" : "Add"}
        </Button>
      </div>
    </div>
  );
};

export default AddThingCard;
