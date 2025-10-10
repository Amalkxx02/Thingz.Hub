import "./Button.css";

const Button = ({ type, loading, disabled, onClick, children }) => {
  return (
    <button type={type} className={`button ${loading ? "loading" : ""}`} disabled = {disabled} onClick={onClick}>
      {loading ? <div className="spinner"></div> : children}
    </button>
  );
};

export default Button;
