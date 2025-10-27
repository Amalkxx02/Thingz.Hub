import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../apis/authApi.js";

//Hooks
import useApiSubmission from "../../../../shared/hooks/useApiSubmission.js";
import useValidator from "../../../../shared/hooks/useValidator.js";

export default function useSignIn() {
  const { loading, success, error, execute } = useApiSubmission();
  const {
    reset,
    eValue,
    pValue,
    eError,
    pError,
    onEmailChange,
    onPasswordChange,
  } = useValidator();

  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      reset();
      navigate("/dashboard");
    }
  }, [success]);

  const onSubmitSignIn = async (e) => {
    e.preventDefault();
    const userData = {
      user_email: eValue,
      user_password: pValue,
    };
    await execute(signIn, userData);
  };

  const isFormInvalid = !eValue || !pValue || eError || pError || loading;

  return {
    error,

    eError,
    eValue,
    onEmailChange,

    pError,
    pValue,
    onPasswordChange,

    onSubmitSignIn,
    loading,
    isFormInvalid,
  };
}
