import { useState } from "react";
import SignUpForm from "../features/auth/components/SignUpForm/SignUpForm";
import SignInForm from "../features/auth/components/SignInForm/SignInForm";
import ForgotForm from "../features/auth/components/ForgotForm/ForgotForm";
const Authentication = () => {
  const [currentView, setCurrentView] = useState("signIn");

  const renderView = () => {
    switch (currentView) {
      case "signIn":
        return <SignInForm onToggleView={setCurrentView} />;
      case "signUp":
        return <SignUpForm onToggleView={setCurrentView} />;
      case "forgot":
        return <ForgotForm onToggleView={setCurrentView} />;
      default:
        return <SignInForm onToggleView={setCurrentView} />;
    }
  };
  return (
    <div className="flex items-center justify-center size-full bg-gray-50">
      <div className="flex h-2/3 w-3/4  md:w-1/2 shadow-2xl rounded-xl overflow-hidden">
        <div className="w-1/2 bg-indigo-600 text-white p-8 hidden md:flex flex-col justify-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="mt-4 text-indigo-100">
            Sign in to continue your journey.
          </p>
        </div>

        <div className="flex items-center justify-center w-full md:w-1/2 px-8 py-10">
          {renderView()}
        </div>
      </div>
    </div>
  );
};

export default Authentication;
