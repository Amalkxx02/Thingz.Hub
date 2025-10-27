const Button = ({
  type = "button", // Add a default type
  isLoading,
  isDisabled,
  onClick,
  children,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`flex size-full items-center justify-center border-l-6 border-l-indigo-600 p-2 text-gray-800 shadow-sm hover:border-l-green-600 ${isLoading ? "loading" : ""} transition-all duration-200 ease-in-out disabled:border-l-red-600`}
      disabled={isDisabled}
      onClick={onClick}
      form={rest.form}
    >
      {isLoading ? (
        <div className="size-6 animate-spin rounded-full border-2 border-indigo-200 border-t-green-600" />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
