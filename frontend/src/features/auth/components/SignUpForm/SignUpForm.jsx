//Hook
import useSignUp from "./useSignUp";

//Style
import "../../style/authStyle.css";

//Elements
import Button from "../../../../shared/components/Button/Button";
import InputText from "../../../../shared/components/Input/InputText";
//import Toast from "../../../shared/components/toast/Toast";

const SignUpForm = ({ onToggleView }) => {
  const {
    //error,

    eError,
    eValue,
    onEmailChange,

    pError,
    pValue,
    onPasswordChange,

    username,
    setUsername,

    //statusCode,

    onSubmitSignUp,
    loading,
    isFormInvalid,
  } = useSignUp();

  return (
      <form className="auth-form" onSubmit={onSubmitSignUp}>
        <h2 className="auth-form-title">Sign Up</h2>

          <InputText type="u-name" value={username} onChange={setUsername} />

          <InputText
            type="email"
            value={eValue}
            onChange={onEmailChange}
            status={!eValue ? "" : eError ? "error" : "success"}
          />

          <InputText
            type="password"
            value={pValue}
            onChange={onPasswordChange}
            status={!pValue ? "" : pError ? "error" : "success"}
          />

        <div className="auth-form-button">
          <Button
            type="submit"
            isLoading={loading}
            isDisabled={isFormInvalid || loading}
          >
            Sign Up
          </Button>
        </div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onToggleView("signIn");
            }}
            className="auth-form-link"
          >
            <div>Already have an account? Sign In</div>
            
          </a>
      </form>
  );
};

export default SignUpForm;
