import React,{useState} from 'react';
import LoginForm from '../../components/authForms/LoginForm';
import SignupFrom from '../../components/authForms/SignupForm';
import ForgotPasswordForm from '../../components/authForms/ForgotPasswordForm';
import './Auth.css';

const Auth = () => {
  const [currentView,setCurrentView] = useState('signIn');

  const renderView = () =>{
    switch (currentView) {
      case 'signIn':
        return <LoginForm onToggeleView ={setCurrentView}/>;
      case 'signUp':
        return <SignupFrom onToggeleView ={setCurrentView}/>;
      case 'forgot':
        return <ForgotPasswordForm onToggeleView ={setCurrentView}/>;
      default:
        return <SignupFrom onToggeleView ={setCurrentView}/>;
    }
  };
  return (
    <div className="login-page-main-container">
    <div className="login-page-sub-container">
      <div className="left-div">
        {/* You can add content here later, like an image or text */}
      </div>
        <div className="right-div">
            {renderView()}
         </div>
        </div>
    </div>
  );
};

export default Auth;