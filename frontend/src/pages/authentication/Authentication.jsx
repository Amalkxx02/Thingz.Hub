import React,{useState} from 'react';
import SignupForm from '../../components/auth/signup/Signup';
import SigninForm from '../../components/auth/signin/Signin';
import Forgot from '../../components/auth/forgot/Forgot';
import './Authentication.css';

const Authentication = () => {
  const [currentView,setCurrentView] = useState('signIn');

  const renderView = () =>{
    switch (currentView) {
      case 'signIn':
        return <SigninForm onToggleView ={setCurrentView}/>;
      case 'signUp':
        return <SignupForm onToggleView ={setCurrentView}/>;
      case 'forgot':
        return <Forgot onToggleView ={setCurrentView}/>;
      default:
        return <SignupForm onToggleView ={setCurrentView}/>;
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

export default Authentication;