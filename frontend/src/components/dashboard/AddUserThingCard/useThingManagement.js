import { useState, useEffect } from "react";
import { addUserThingCard } from "../../../apis/userThingCardApi";
import useApiSubmission from "../../hooks/useApiSubmission";
import useThingSelector from "./ThingSelection/useThingSelector";

export default function useThingManagement(setTab, userId) {
  const [isConfigView, setIsConfigView] = useState(false);
  const [thingConfiguration, setThingConfiguration] = useState({});
  const [selectedThingId, setSelectedThingId] = useState(null);

  const thingSubmission = useApiSubmission();
  const {
    selectionState,
    selectedThingObject,
    ...selectorHandlers
  } = useThingSelector(userId);

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
    } else {
      submitThingCard();
    }
  };

  const getActionButtonText = () => {
    return isConfigView ? "Add" : "Continue";
  };

  const submitThingCard = () => {
    const thingData = {
      thing_id: selectedThingId,
      config: thingConfiguration,
    };
    thingSubmission.execute(addUserThingCard, thingData, userId);
  };

  return {
    thingManagementState: thingSubmission,
    selectedThingObject,
    getComponentToRender,
    handleCloseCard,
    handleContinueOrAdd,
    getActionButtonText,
    isThingSelected,
    selectionState,
    setThingConfiguration,
    ...selectorHandlers,
  };
}