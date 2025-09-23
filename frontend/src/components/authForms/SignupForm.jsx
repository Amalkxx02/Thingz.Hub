
import { useState } from 'react';
import { signUp } from '../../api/auth';
import './FormStyles.css'; // Import the shared CSS file

const SignupForm = ({onToggeleView}) => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const handleSubmit = async (e) =>{
    e.preventDefault();

    try {
      const data = await signUp(name,email,password);
    } catch (error) {
      console.log("ops");
    }
  }
  return (
    <div className="container">
      <h2 className="heading">Create Account</h2>
      <form className="form-body" onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
          type="text" 
          id="username" 
          placeholder='User Name'
          onChange={(e)=>setName(e.target.value)} 
          className="form-input" />
        </div>
        <div className="form-group">
          <input 
          type="email" 
          id="email" 
          placeholder='Email'
          onChange={(e)=>setEmail(e.target.value)} 
          className="form-input" />
        </div>
        <div className="form-group">
          <input 
          type="password" 
          id="password" 
          placeholder='Password'
          onChange={(e)=>setPassword(e.target.value)}  
          className="form-input" />
        </div>
        <button type="submit" className="button">
          Sign Up
        </button>
        <a href="#" onClick={()=> onToggeleView('signIn')} className="link">Already have an account?</a>
      </form>
    </div>
  );
};

export default SignupForm;