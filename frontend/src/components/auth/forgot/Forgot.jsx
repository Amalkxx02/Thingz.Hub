
import "../FormStyles.css"; // Import the shared CSS file

const Forgot = ({onToggleView}) => {
  return (
    <div className="container">
      <h2 className="heading">Account</h2>
      <form className="form-body">
        <div className="form-group">
          <input type="email" id="email" placeholder='Email' className="form-input" />
        </div>
        <button type="submit" className="button">
          Get OTP
        </button>
        <a onClick={()=> onToggleView('signIn')} className="link">Back to Sign in</a>
      </form>
    </div>
  );
};

export default Forgot;