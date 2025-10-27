const InputSlider = ({
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
  };
  return (
    <input
      {...inputProps}
      placeholder={placeholder || inputProps.placeholder}
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
  );
};

export default InputSlider;
