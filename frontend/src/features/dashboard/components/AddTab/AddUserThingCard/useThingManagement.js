import { useState, useEffect } from "react";
import { addUserThingCard } from "../../../apis/userThingCardApi";
import useApiSubmission from "../../hooks/useApiSubmission.js";
import useThingSelector from "./ThingSelection/useThingSelector";
import useThingConfiguration from "./Config/useThingConfiguration";

export default function useThingManagement(setTab, userId) {
  const [isConfigView, setIsConfigView] = useState(false);
  const [selectedThingId, setSelectedThingId] = useState(null);

  const { success, execute, loading, error } = useApiSubmission();

  const {
    selectionState,
    selectedThingObject,
    ...selectorHandlers
  } = useThingSelector(userId);

  const {
    sensorConfig,
    actuatorConfig,
    ...configHandlers

  } = useThingConfiguration()


  const { selectedThingType } = selectionState;

  const isThingSelected = selectedThingObject != null;

  useEffect(() => {
    if (selectedThingObject) {
      setSelectedThingId(selectedThingObject.thing_id);
    } else {
      setSelectedThingId(null);
    }
  }, [selectedThingObject]);

  const getComponentToRender = () => {
    return isConfigView ? `${selectedThingType}Config` : "selector";
  };

  const handleCloseCard = () => {
    setTab(null);
    setSelectedThingId(null);
    setIsConfigView(false);
  };

  const handleContinueOrAdd = () => {
    if (!isConfigView) {
      setIsConfigView(true);
    }
  };

  const getActionButtonText = () => {
    return isConfigView ? "Add" : "Continue";
  };

  const getActionButtonType = () => {
    return isConfigView ? "submit" : "button";
  };

  const submitThingCard = async (e) => {
    e.preventDefault();
    const thingData = {
      thing_id: selectedThingId,
      thing_config: selectedThingType === "sensors" ? sensorConfig : actuatorConfig
    };
    await execute(addUserThingCard, thingData, userId);
  };

  return {
    getComponentToRender,
    handleCloseCard,
    handleContinueOrAdd,
    getActionButtonType,
    getActionButtonText,
    isThingSelected,
    loading,

    selectionState,
    ...selectorHandlers,

    submitThingCard,
    ...configHandlers
  };
}