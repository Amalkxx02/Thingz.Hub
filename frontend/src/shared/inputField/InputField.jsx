import "./InputField.css";

const InputField = ({
  type,
  value,
  placeholder,
  onChange,
  min,
  max,
  ...rest
}) => {
  const inputConfig = {
    "f-name": { type: "text", placeholder: "First Name", required: true },
    "s-name": { type: "text", placeholder: "Second Name" },
    "u-name": { type: "text", placeholder: "User Name", required: true },
    custom: { type: "text", placeholder: placeholder, required: true },
    number: { type: "number", placeholder: placeholder },

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
    range: {
      type: "range",
      min: min,
      max: max,
    },
    checkbox: {
      type: "checkbox",
    },
  };
  const inputProps = inputConfig[type] || { type: "text" };
  return (
    <input
      {...inputProps}
      value={value}
      onChange={(e) => {
        type === "checkbox"
          ? onChange(e.target.checked)
          : onChange(e.target.value);
      }}
      className={`input ${rest.className || ""}`}
    />
  );
};

export default InputField;
