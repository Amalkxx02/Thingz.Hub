import { useEffect, useState } from "react";

//Style
import "../FormStyles.css";

//API
import { signUp } from "../../../apis/authApi";

//Elements
import Button from "../../common/Button/Button";
import InputField from "../../common/inputField/InputField";
import Toast from "../../toast/Toast";

//Hooks
import useApiSubmission from "../../hooks/useApiSubmission";
import useValidator from "../../hooks/useValidator";

const SignupForm = ({ onToggleView }) => {
  const [username, setUsername] = useState("");

  const [statusCode, setStatusCode] = useState(null);

  const signupRequest = useApiSubmission();
  const validation = useValidator();

  useEffect(() => {
    if (signupRequest.success || signupRequest.error) {
      setStatusCode(
        signupRequest.success?.status || signupRequest.error?.status || null
      );
      const timer = setTimeout(() => {
        setStatusCode(null);
        if (signupRequest.success) {
          setUsername("");
          validation.reset();
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [signupRequest.success, signupRequest.error]);

  const onSubmitSignup = async (e) => {
    e.preventDefault();
    const userData = {
      username,
      email: validation.eValue,
      password: validation.pValue,
    };
    signupRequest.execute(signUp, userData);
  };

  const isFormInvalid =
    !username ||
    !validation.eValue ||
    !validation.pValue ||
    validation.eError ||
    validation.pError ||
    signupRequest.loading;

  return (
    <div className="container">
      {statusCode && (
        <Toast
          alert={signupRequest.success?.message || signupRequest.error?.message}
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
            value={validation.eValue}
            onChange={validation.onEmailChange}
            className={
              !validation.eValue
                ? ""
                : validation.eError
                ? "input-error"
                : "input-success"
            }
          />
        </div>

        <div className="form-group">
          <InputField
            type="password"
            value={validation.pValue}
            onChange={validation.onPasswordChange}
            className={
              !validation.pValue
                ? ""
                : validation.pError
                ? "input-error"
                : "input-success"
            }
          />
        </div>
        <Button type="submit" loading={signupRequest.loading} disabled={isFormInvalid}>
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
