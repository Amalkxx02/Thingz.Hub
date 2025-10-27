import { useEffect, useState } from "react";

import { signUp } from "../../apis/authApi.js";

//Hooks
import useApiSubmission from "../../../../shared/hooks/useApiSubmission.js";
import useValidator from "../../../../shared/hooks/useValidator.js";

export default function useSignUp() {
  const [username, setUsername] = useState("");

  const [statusCode, setStatusCode] = useState(null);

  const { success, execute, loading, error } = useApiSubmission();
  const {
    reset,
    eValue,
    pValue,
    eError,
    pError,
    onEmailChange,
    onPasswordChange,
  } = useValidator();

  useEffect(() => {
    if (success || error) {
      setStatusCode(success?.status || error?.status || null);
      setStatusCode(null);
      if (success) {
        setUsername("");
        reset();
      }
    }
  }, [success, error]);

  const onSubmitSignUp = async (e) => {
    e.preventDefault();
    const userData = {
      user_name: username,
      user_email: eValue,
      user_password: pValue,
    };
    await execute(signUp, userData);
  };

  const isFormInvalid =
    !username || !eValue || !pValue || eError || pError || loading;
  return {
    error,

    eError,
    eValue,
    onEmailChange,

    pError,
    pValue,
    onPasswordChange,

    username,
    setUsername,

    statusCode,

    onSubmitSignUp,
    loading,
    isFormInvalid,
  };
}
