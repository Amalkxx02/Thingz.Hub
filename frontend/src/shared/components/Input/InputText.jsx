const InputText = ({
  type,
  value,
  placeholder,
  onChange,
  required,
  label,
  status,
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
  };
  const inputProps = inputConfig[type] || { type: "text" };
  return (
    <label className="flex flex-col gap-2">
      {label}
      <input
        {...inputProps}
        placeholder={placeholder || inputProps.placeholder || ""}
        required={required || inputProps.required || false}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full border-l-6 bg-white p-3 text-gray-800 shadow-sm outline-none ${
          status === "error"
            ? "border-red-600"
            : status === "success"
              ? "border-green-600"
              : "border-indigo-600"
        } transition-all duration-200 ease-in-out`}
      />
    </label>
  );
};

export default InputText;
