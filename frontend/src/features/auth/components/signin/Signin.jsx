import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../FormStyles.css";

import { signIn } from "../../../../apis/authApi.js";

//Elements
import Button from "../../common/Button/Button";
import InputField from "../../common/inputField/InputField";
import Toast from "../../toast/Toast";

//Hooks
import useApiSubmission from "../../hooks/useApiSubmission.js";
import useValidator from "../../hooks/useValidator.js";

const SigninForm = ({ onToggleView }) => {
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

  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        reset();
        navigate("/dashboard");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  const onSubmitSignin = async (e) => {
    e.preventDefault();
    const userData = {
      user_email: eValue,
      user_password: pValue,
    };
    await execute(signIn, userData);
  };

  const isFormInvalid = !eValue || !pValue || eError || pError || loading;
  return (
    <div className="container w-full p-2">
      {error && <Toast alert={error?.message} />}
      <h2 className="text-center text-2xl">Login to Account</h2>
      <form className="flex flex-col" onSubmit={onSubmitSignin}>
        <div className="flex flex-col">
          <InputField
            type="email"
            value={eValue}
            onChange={onEmailChange}
            className={!eValue ? "" : eError ? "input-error" : "input-success"}
          />
        </div>
        <div className="flex flex-col">
          <InputField
            type="password"
            value={pValue}
            onChange={onPasswordChange}
            className={!pValue ? "" : pError ? "input-error" : "input-success"}
          />
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onToggleView("forgot");
            }}
            className="link"
          >
            Forgot Password?
          </a>
        </div>

        <Button type="submit" isLoading={loading} isDisabled={isFormInvalid}>
          Sign In
        </Button>
        <a
          onClick={(e) => {
            e.preventDefault();
            onToggleView("signUp");
          }}
          className="link"
        >
          Don't have an account?
        </a>
      </form>
    </div>
  );
};

export default SigninForm;
