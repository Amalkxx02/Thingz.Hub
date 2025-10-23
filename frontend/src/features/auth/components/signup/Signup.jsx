import { useEffect, useState } from "react";

//Style
import "../FormStyles.css";

//API
import { signUp } from "../../../../apis/authApi.js";

//Elements
import Button from "../../common/Button/Button";
import InputField from "../../common/inputField/InputField";
import Toast from "../../toast/Toast";

//Hooks
import useApiSubmission from "../../hooks/useApiSubmission.js";
import useValidator from "../../hooks/useValidator.js";

const SignupForm = ({ onToggleView }) => {
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
      setStatusCode(
        success?.status || error?.status || null
      );
      const timer = setTimeout(() => {
        setStatusCode(null);
        if (success) {
          setUsername("");
          reset();
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const onSubmitSignup = async (e) => {
    e.preventDefault();
    const userData = {
      user_name: username,
      user_email: eValue,
      user_password: pValue,
    };
    await execute(signUp, userData);
  };

  const isFormInvalid =
    !username ||
    !eValue ||
    !pValue ||
    eError ||
    pError ||
    loading;

  return (
    <div className="container">
      {statusCode && (
        <Toast
          alert={success?.message || error?.message}
        />
      )}
      <h2 className="heading">Create Account</h2>
      <form className="form-body" onSubmit={onSubmitSignup}>
        <div className="form-group">
          <InputField type="u-name" value={username} onChange={setUsername} />
        </div>
        <div className="form-group">
          <InputField
            type="email"
            value={eValue}
            onChange={onEmailChange}
            className={
              !eValue
                ? ""
                : eError
                ? "input-error"
                : "input-success"
            }
          />
        </div>

        <div className="form-group">
          <InputField
            type="password"
            value={pValue}
            onChange={onPasswordChange}
            className={
              !pValue
                ? ""
                : pError
                ? "input-error"
                : "input-success"
            }
          />
        </div>
        <Button type="submit" isLoading={loading}>
          Sign Up
        </Button>
        <a onClick={() => onToggleView("signIn")} className="link">
          Already have an account?
        </a>
      </form>
    </div>
  );
};

export default SignupForm;
