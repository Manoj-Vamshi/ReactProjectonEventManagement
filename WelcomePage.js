import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Styling.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="welcome-container">
      <div className="content-wrapper">
        <div className="text-container">
          <h1 className="text-1">VRV Events</h1>
          <p>"Simplify, Organize, Celebrate..!!"</p>
        </div>
        <div className="button-container">
          <button className="btn btn-custom" onClick={handleSignupClick}>Sign Up</button>
          <button className="btn btn-custom" onClick={handleLoginClick}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
