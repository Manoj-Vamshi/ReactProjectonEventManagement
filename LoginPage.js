import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebaseConfig.js';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import './Styling.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/homepage');
    } catch (error) {
      console.error("Error signing in: ", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert('Password reset email sent. Please check your inbox.');
          } catch (error) {
      console.error('Error sending password reset email:', error);
      alert('Failed to send password reset email. Please try again.');
    }
  };


  return (
    <div >
     
      <div className="login-page">

        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="loginbtn" type="submit">Login</button>
        </form>
        <a className="loginbtna" >Forgot Password?</a>

             
      </div>
  
    </div>
  );
};

export default LoginPage;