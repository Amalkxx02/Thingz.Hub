import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../FormStyles.css"

import { signIn } from "../../../apis/authApi";

//Elements
import Button from "../../common/Button/Button";
import InputField from "../../common/inputField/InputField";
import Toast from "../../toast/Toast";

//Hooks
import useApiSubmission from "../../hooks/useApiSubmission";
import useValidator from "../../hooks/useValidator";

const SigninForm = ({ onToggleView }) => {
  const signinRequest = useApiSubmission();
  const signinValidation = useValidator();

  const navigate = useNavigate();

  useEffect(() => {
    if (signinRequest.success) {
      const timer = setTimeout(() => {
        signinValidation.reset();
        navigate("/dashboard");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [signinRequest.success]);

  const onSubmitSignin = async (e) => {
    e.preventDefault();
    const userData = {
      user_email: signinValidation.eValue,
      user_password: signinValidation.pValue,
    };
    signinRequest.execute(signIn, userData);
  };

  const isFormInvalid =
    !signinValidation.eValue ||
    !signinValidation.pValue ||
    signinValidation.eError ||
    signinValidation.pError ||
    signinRequest.loading;
  return (
    <div className="container">
      {signinRequest.error && <Toast alert={signinRequest.error?.message} />}
      <h2 className="heading">Login to Account</h2>
      <form className="form-body" onSubmit={onSubmitSignin}>
        <div className="form-group">
          <InputField
            type="email"
            value={signinValidation.eValue}
            onChange={signinValidation.onEmailChange}
            className={
              !signinValidation.eValue
                ? ""
                : signinValidation.eError
                ? "input-error"
                : "input-success"
            }
          />
        </div>
        <div className="form-group">
          <InputField
            type="password"
            value={signinValidation.pValue}
            onChange={signinValidation.onPasswordChange}
            className={
              !signinValidation.pValue
                ? ""
                : signinValidation.pError
                ? "input-error"
                : "input-success"
            }
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

        <Button type="submit" isLoading={signinRequest.loading} isDisabled={isFormInvalid}>
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
