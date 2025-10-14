import "./InputField.css";

const InputField = ({ type, value, placeholder, onChange,...rest }) => {
  const inputConfig = {
    "f-name": { type: "text", placeholder: "First Name", required: true },
    "s-name": { type: "text", placeholder: "Second Name" },
    "u-name": { type: "text", placeholder: "User Name", required: true },
    "n-name": { type: "text", placeholder: placeholder, required: true },

    email: {
      type: "email",
      placeholder: "Email",
      required: true,
    },
    password: {
      type: "password",
      placeholder: "Password",
      required: true,
      minLength: 8,
    },
  };
  const inputProps = inputConfig[type] || { type: "text" };
  return (
    <input
      {...inputProps}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`input ${rest.className || ''}`}
    />
  );
};

export default InputField;
