//Hook
import useForgot from "./useForgot";

//Style
import "../../style/authStyle.css";

//Elements
import Button from "../../../../shared/components/Button/Button";
import InputText from "../../../../shared/components/Input/InputText";

const ForgotForm = ({ onToggleView }) => {
  const { eValue, eError, onEmailChange, isEmailInvalid } = useForgot();

  return (
      <form className="auth-form">
        <h2 className="auth-form-title">Reset Password</h2>

          <InputText
            type="email"
            value={eValue}
            onChange={onEmailChange}
            status={!eValue ? "" : eError ? "error" : "success"}
          />

        <div className="auth-form-button">
          <Button type="submit" isDisabled={isEmailInvalid}>
            Get OTP
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
          Back to Sign in
        </a>
      </form>
  );
};

export default ForgotForm;
