import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Hooks
import useApiSubmission from "../../../../shared/hooks/useApiSubmission.js";
import useValidator from "../../../../shared/hooks/useValidator.js";

export default function useForgot() {
    const {
    eValue,
    eError,
    onEmailChange,
  } = useValidator();

  const isEmailInvalid = !eValue || eError;

  return {
    eValue,
    eError,
    onEmailChange
  };
}
