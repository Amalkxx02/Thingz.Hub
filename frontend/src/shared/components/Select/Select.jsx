const Select = ({ value, onChange, options }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full border-l-6 bg-white p-3 text-gray-800 shadow-sm outline-none ${value ? "border-green-600" : "border-indigo-600"} `}
    >
      <option value="">Select</option>
      {Array.isArray(options) &&
        options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
    </select>
  );
};

export default Select;
