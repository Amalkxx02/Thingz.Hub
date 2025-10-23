import "./Button.css";

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
      className={`btn ${isLoading ? "loading" : ""}`}
      disabled={isDisabled}
      onClick={onClick}
      form ={rest.form}
    >
      {isLoading   ? <div className="spinner"></div> : children}
    </button>
  );
};

export default Button;
