import { useState } from "react";
import { z } from "zod";

const emailSchema = z.email();

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[@$!%*?&]/, "Password must contain at least one special character");

const useValidator = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [eError, setEError] = useState(false);
  const [pError, setPError] = useState(false);

  const handleEmailOnChange = (value) => {
    setEmail(value);
    if (!value) {
      setEError(false);
    } else {
      const result = emailSchema.safeParse(value);
      setEError(!result.success);
    }
  };

  const handlePasswordOnChange = (value) => {
    setPassword(value);
    if (!value) {
      setPError(false);
    } else {
      const result = passwordSchema.safeParse(value);
      setPError(!result.success);
    }
  };

  const reset = ()=>{
    setEmail('');
    setPassword('');

    setEError('');
    setPError('');
  }
  return {
    eValue: email,
    pValue: password,
    eError,
    pError,
    reset,
    onEmailChange: handleEmailOnChange,
    onPasswordChange: handlePasswordOnChange,
  };
};
export default useValidator;
