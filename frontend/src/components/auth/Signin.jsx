import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./FormStyles.css";

import { signIn } from "../../apis/auth";

//Elements
import LoadingButton from "../element/loadingButton/LoadingButton";
import InputField from "../element/inputField/InputField";
import Toast from "../element/toast/Toast";

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
        //navigate("/dashboard");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [signinRequest.success]);

  const onSubmitSignin = async (e) => {
    e.preventDefault();
    const userData = { email:signinValidation.eValue, password:signinValidation.pValue };

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

        <LoadingButton loading={signinRequest.loading} disable={isFormInvalid}>Sign In</LoadingButton>
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
