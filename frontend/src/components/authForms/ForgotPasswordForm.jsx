
import './FormStyles.css'; // Import the shared CSS file

const ForgotPasswordForm = ({onToggeleView}) => {
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
        <a href="#" onClick={()=> onToggeleView('signIn')} className="link">Back to Sign in</a>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;