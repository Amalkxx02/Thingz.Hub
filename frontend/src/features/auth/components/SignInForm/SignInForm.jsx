//Hook
import useSignIn from "./useSignIn";

//Style
import "../../style/authStyle.css";

//Elements
import Button from "../../../../shared/components/Button/Button";
import InputText from "../../../../shared/components/Input/InputText";
//import Toast from "../../../shared/components/toast/Toast";

const SignInForm = ({ onToggleView }) => {
  const {
    //error,

    eError,
    eValue,
    onEmailChange,

    pError,
    pValue,
    onPasswordChange,

    onSubmitSignIn,
    loading,
    isFormInvalid,
  } = useSignIn();

  return (
    <form className="auth-form" onSubmit={onSubmitSignIn}>
      <h2 className="auth-form-title">Sign In</h2>
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
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onToggleView("forgot");
        }}
        className="auth-form-link"
      >
        Forgot Password?
      </a>

      <div className="auth-form-button">
        <Button
          type="submit"
          isLoading={loading}
          isDisabled={isFormInvalid || loading}
        >
          Sign In
        </Button>
      </div>

      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onToggleView("signUp");
        }}
        className="auth-form-link"
      >
        <div>Don't have an account? Sign Up</div>
      </a>
    </form>
  );
};

export default SignInForm;
