import { useState } from 'react';
import { login } from '../../api/auth.js';
import './FormStyles.css'; // Import the shared CSS file

const LoginForm = ({onToggeleView}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async(e) => {
    e.preventDefault(); // Prevents the browser from reloading the page
    
    console.log('Email:', email);
    console.log('Password:', password);
    
    try {
      // Call the login function and wait for the response
      const data = await login(email, password);
      
      // Handle a successful login
      console.log('Login successful:', data);
      alert('Login successful!');
      
      // You can redirect the user or perform other actions here
      
    } catch (error) {
      // Handle a failed login (e.g., display an error message)
      console.error('Login error:', error.message);
      alert(error.message);
    }
  };
  return (
    <div className="container">
      <h2 className="heading">Login</h2>
      <form className="form-body" onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
          type="email" 
          id="email" 
          placeholder='Email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          className="form-input" />
        </div>
        <div className="form-group">
          <input 
          type="password" 
          id="password" 
          placeholder='Password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}  
          className="form-input" />
          <a href="#" onClick={(e)=> {e.preventDefault(); onToggeleView('forgot')}} className="link">Forgot Password?</a>
        </div>
        
        <button type="submit" className="button">
          Sign In
        </button>
        <a href="#" onClick={(e)=> {e.preventDefault(); onToggeleView('signUp')}} className="link">Don't have an account?</a>
      </form>
    </div>
  );
};

export default LoginForm;