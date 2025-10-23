import Button from "../../common/Button/Button";
import InputField from "../../common/inputField/InputField";
import useValidator from "../../hooks/useValidator";

import "../FormStyles.css"; // Import the shared CSS file

const Forgot = ({ onToggleView }) => {
    const {
    eValue,
    eError,
    onEmailChange,
  } = useValidator();

  const isEmailInvalid = !eValue || eError;

  return (
    <div className="container">
      <h2 className="heading">Account</h2>
      <form className="form-body">
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
        <Button type="submit" isDisabled={isEmailInvalid}>
          Get OTP
        </Button>
        <a onClick={() => onToggleView("signIn")} className="link">
          Back to Sign in
        </a>
      </form>
    </div>
  );
};

export default Forgot;
