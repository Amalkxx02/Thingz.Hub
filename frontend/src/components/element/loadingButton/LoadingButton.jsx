import "./LoadingButton.css";

const LoadingButton = ({ loading,disable, children }) => {
  return (
    <button type="submit" className={`button ${loading ? "loading" : ""}`} disabled = {disable}>
      {loading ? <div className="spinner"></div> : children}
    </button>
  );
};

export default LoadingButton;
